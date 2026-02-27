"use client";
import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  InputAdornment,
  LinearProgress,
  Collapse,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  alpha,
  Rating,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

// ─── Constants ────────────────────────────────────────────────────────────────
const BADGE_OPTIONS = ["None", "New", "Best Seller", "Sale", "Limited", "Hot"];

const BADGE_COLORS = {
  New:         { bg: alpha("#6366f1", 0.12), color: "#818cf8", border: alpha("#6366f1", 0.3) },
  "Best Seller":{ bg: alpha("#f59e0b", 0.12), color: "#fbbf24", border: alpha("#f59e0b", 0.3) },
  Sale:        { bg: alpha("#ef4444", 0.12), color: "#f87171", border: alpha("#ef4444", 0.3) },
  Limited:     { bg: alpha("#8b5cf6", 0.12), color: "#a78bfa", border: alpha("#8b5cf6", 0.3) },
  Hot:         { bg: alpha("#f97316", 0.12), color: "#fb923c", border: alpha("#f97316", 0.3) },
};

// ─── Avatar color helper ──────────────────────────────────────────────────────
const COLORS = [
  "#6366f1", "#22d3ee", "#f59e0b", "#10b981",
  "#8b5cf6", "#ef4444", "#ec4899", "#14b8a6",
];
const getColor = (str = "") =>
  COLORS[[...str].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length];

// ─── Shared sx ────────────────────────────────────────────────────────────────
const inputSx = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#ffffff18" },
    "&:hover fieldset": { borderColor: "#6366f166" },
    "&.Mui-focused fieldset": { borderColor: "#6366f1" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#6366f1" },
};

// ─── BadgeChip ────────────────────────────────────────────────────────────────
function BadgeChip({ badge }) {
  if (!badge || badge === "None") return null;
  const style = BADGE_COLORS[badge] || { bg: alpha("#64748b", 0.12), color: "#94a3b8", border: alpha("#64748b", 0.3) };
  return (
    <Chip
      label={badge}
      size="small"
      sx={{
        bgcolor: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        fontWeight: 700,
        fontSize: "0.68rem",
        height: 20,
        px: 0.25,
      }}
    />
  );
}

// ─── Expandable Table Row ─────────────────────────────────────────────────────
function ProductRow({ product, index, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const color = getColor(product.name);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {/* Expand toggle */}
        <TableCell sx={{ width: 48, pr: 0, borderColor: "#ffffff0a" }}>
          <IconButton size="small" onClick={() => setOpen((v) => !v)} sx={{ color: "text.secondary" }}>
            {open ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
          </IconButton>
        </TableCell>

        {/* Index */}
        <TableCell sx={{ width: 48, borderColor: "#ffffff0a" }}>
          <Typography variant="caption" color="text.secondary" fontWeight={700}>
            #{index + 1}
          </Typography>
        </TableCell>

        {/* Product Name + Emoji */}
        <TableCell sx={{ borderColor: "#ffffff0a" }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "10px",
                bgcolor: alpha(color, 0.12),
                border: `1px solid ${alpha(color, 0.25)}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.35rem",
                flexShrink: 0,
              }}
            >
              {product.image || "📦"}
            </Box>
            <Box minWidth={0}>
              <Stack direction="row" alignItems="center" spacing={0.75}>
                <Typography variant="body2" fontWeight={700} color="text.primary" noWrap>
                  {product.name}
                </Typography>
                <BadgeChip badge={product.badge} />
              </Stack>
              <Typography variant="caption" color="text.secondary">
                {product.reviews ?? 0} reviews
              </Typography>
            </Box>
          </Stack>
        </TableCell>

        {/* Price */}
        <TableCell sx={{ borderColor: "#ffffff0a" }}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <LocalOfferOutlinedIcon sx={{ fontSize: 13, color: "#10b981" }} />
            <Typography variant="body2" fontWeight={700} color="#10b981">
              {product.price || "—"}
            </Typography>
          </Stack>
        </TableCell>

        {/* Rating */}
        <TableCell sx={{ borderColor: "#ffffff0a" }}>
          <Stack direction="row" alignItems="center" spacing={0.75}>
            <StarOutlinedIcon sx={{ fontSize: 14, color: "#f59e0b" }} />
            <Typography variant="body2" fontWeight={700} color="#f59e0b">
              {product.rating ?? "—"}
            </Typography>
            <Typography variant="caption" color="text.secondary">/ 5</Typography>
          </Stack>
        </TableCell>

        {/* Actions */}
        <TableCell align="right" sx={{ borderColor: "#ffffff0a" }}>
          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={() => onEdit(product)}
                sx={{ color: "primary.main", bgcolor: alpha("#6366f1", 0.08), "&:hover": { bgcolor: alpha("#6366f1", 0.18) } }}
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={() => onDelete(product.id)}
                sx={{ color: "error.main", bgcolor: alpha("#ef4444", 0.08), "&:hover": { bgcolor: alpha("#ef4444", 0.18) } }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>

      {/* Expanded detail */}
      <TableRow>
        <TableCell colSpan={6} sx={{ py: 0, bgcolor: "#0f0f1399", borderColor: "#ffffff0a" }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ py: 2.5, px: 3 }}>
              <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap" gap={2}>
                {/* Big emoji */}
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: "16px",
                    bgcolor: alpha(color, 0.12),
                    border: `1px solid ${alpha(color, 0.25)}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.25rem",
                    flexShrink: 0,
                  }}
                >
                  {product.image || "📦"}
                </Box>

                <Box flex={1} minWidth={180}>
                  <Stack direction="row" alignItems="center" spacing={1} mb={0.5} flexWrap="wrap" gap={0.5}>
                    <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                      {product.name}
                    </Typography>
                    <BadgeChip badge={product.badge} />
                  </Stack>

                  {/* Star rating visual */}
                  <Rating
                    value={parseFloat(product.rating) || 0}
                    precision={0.1}
                    readOnly
                    size="small"
                    sx={{ "& .MuiRating-iconFilled": { color: "#f59e0b" }, "& .MuiRating-iconEmpty": { color: "#ffffff18" } }}
                  />

                  <Stack direction="row" spacing={2} mt={1} flexWrap="wrap" gap={1}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <LocalOfferOutlinedIcon sx={{ fontSize: 14, color: "#10b981" }} />
                      <Typography variant="body2" fontWeight={700} color="#10b981">{product.price}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <RateReviewOutlinedIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">{product.reviews ?? 0} reviews</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <StarOutlinedIcon sx={{ fontSize: 14, color: "#f59e0b" }} />
                      <Typography variant="body2" fontWeight={700} color="#f59e0b">{product.rating} / 5</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [products,     setProducts]     = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [search,       setSearch]       = useState("");
  const [page,         setPage]         = useState(0);
  const [rowsPerPage,  setRowsPerPage]  = useState(10);
  const [dialogOpen,   setDialogOpen]   = useState(false);
  const [editingId,    setEditingId]    = useState(null);
  const [deleteConfirm,setDeleteConfirm]= useState(null);

  // Form state
  const [name,    setName]    = useState("");
  const [price,   setPrice]   = useState("");
  const [image,   setImage]   = useState("");
  const [rating,  setRating]  = useState("");
  const [reviews, setReviews] = useState("");
  const [badge,   setBadge]   = useState("None");

  // ── Firestore ──────────────────────────────────────────────────────────────
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "products"));
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      // Sort by name alphabetically by default
      docs.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      setProducts(docs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const resetForm = () => {
    setName(""); setPrice(""); setImage("");
    setRating(""); setReviews(""); setBadge("None");
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    const data = {
      name:    name.trim(),
      price:   price.trim(),
      image:   image.trim(),
      rating:  parseFloat(rating) || 0,
      reviews: parseInt(reviews, 10) || 0,
      badge:   badge === "None" ? null : badge,
    };
    if (editingId) {
      await updateDoc(doc(db, "products", editingId), data);
    } else {
      await addDoc(collection(db, "products"), data);
    }
    setDialogOpen(false);
    resetForm();
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setDeleteConfirm(null);
    fetchProducts();
  };

  const openEdit = (p) => {
    setEditingId(p.id);
    setName(p.name || "");
    setPrice(p.price || "");
    setImage(p.image || "");
    setRating(p.rating?.toString() || "");
    setReviews(p.reviews?.toString() || "");
    setBadge(p.badge || "None");
    setDialogOpen(true);
  };

  const openAdd = () => { resetForm(); setDialogOpen(true); };

  // ── Filter + paginate ──────────────────────────────────────────────────────
  const filtered  = products.filter((p) =>
    [p.name, p.price, p.badge].join(" ").toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const canSave   = name.trim().length > 0;

  return (
    <Box>
      {/* Header */}
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} mb={3} spacing={2}>
        <Box>
          <Typography variant="h5" color="text.primary">Products</Typography>
          <Typography variant="body2" color="text.secondary">
            {products.length} product{products.length !== 1 ? "s" : ""} total
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <TextField
            size="small"
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: 220,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ffffff18" },
                "&:hover fieldset": { borderColor: "#6366f166" },
                "&.Mui-focused fieldset": { borderColor: "#6366f1" },
              },
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openAdd}
            sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "#4f46e5" }, borderRadius: 2, px: 2.5, textTransform: "none", fontWeight: 600 }}
          >
            Add Product
          </Button>
        </Stack>
      </Stack>

      {/* Table */}
      <Paper elevation={0} sx={{ border: "1px solid #ffffff0d", borderRadius: 3, overflow: "hidden", bgcolor: "#13131a" }}>
        {loading && <LinearProgress color="primary" sx={{ height: 2 }} />}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  { label: "", width: 48 },
                  { label: "#", width: 48 },
                  { label: "Product" },
                  { label: "Price" },
                  { label: "Rating" },
                  { label: "Actions", align: "right" },
                ].map(({ label, width, align }, i) => (
                  <TableCell
                    key={i}
                    align={align || "left"}
                    sx={{
                      bgcolor: "#1e1e28",
                      color: "#94a3b8",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      ...(width ? { width } : {}),
                    }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8, borderColor: "#ffffff0a" }}>
                    <Inventory2OutlinedIcon sx={{ fontSize: 40, color: "text.secondary", mb: 1, display: "block", mx: "auto" }} />
                    <Typography color="text.secondary" variant="body2">
                      {search ? "No products match your search." : "No products yet. Add one!"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((p, i) => (
                  <ProductRow
                    key={p.id}
                    product={p}
                    index={page * rowsPerPage + i}
                    onEdit={openEdit}
                    onDelete={(id) => setDeleteConfirm(id)}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider sx={{ borderColor: "#ffffff08" }} />
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, p) => setPage(p)}
          onRowsPerPageChange={(e) => { setRowsPerPage(+e.target.value); setPage(0); }}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{ color: "text.secondary", bgcolor: "#13131a", ".MuiTablePagination-select": { color: "text.primary" } }}
        />
      </Paper>

      {/* ── Add / Edit Dialog ── */}
      <Dialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); resetForm(); }}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { backgroundImage: "none", backgroundColor: "#1c1c26", border: "1px solid #ffffff12", borderRadius: 3 } }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ width: 32, height: 32, borderRadius: "8px", bgcolor: alpha("#6366f1", 0.15), display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Inventory2OutlinedIcon sx={{ fontSize: 18, color: "#6366f1" }} />
            </Box>
            <Typography variant="h6" fontWeight={700}>
              {editingId ? "Edit Product" : "Add New Product"}
            </Typography>
          </Stack>
        </DialogTitle>

        <Divider sx={{ borderColor: "#ffffff10" }} />

        <DialogContent sx={{ pt: 2.5 }}>
          <Stack spacing={2.5}>
            {/* Name */}
            <TextField
              label="Product Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              size="small"
              placeholder="e.g. Minimalist Watch"
              sx={inputSx}
            />

            {/* Emoji + Price row */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Emoji / Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                size="small"
                placeholder="🕐"
                sx={{ ...inputSx, width: { xs: "100%", sm: 120 } }}
              />
              <TextField
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                size="small"
                placeholder="$299"
                fullWidth
                sx={inputSx}
              />
            </Stack>

            {/* Rating + Reviews row */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Rating (0–5)"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                size="small"
                type="number"
                inputProps={{ min: 0, max: 5, step: 0.1 }}
                fullWidth
                placeholder="4.8"
                sx={inputSx}
              />
              <TextField
                label="Reviews count"
                value={reviews}
                onChange={(e) => setReviews(e.target.value)}
                size="small"
                type="number"
                inputProps={{ min: 0 }}
                fullWidth
                placeholder="234"
                sx={inputSx}
              />
            </Stack>

            {/* Live rating preview */}
            {rating && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  value={parseFloat(rating) || 0}
                  precision={0.1}
                  readOnly
                  size="small"
                  sx={{ "& .MuiRating-iconFilled": { color: "#f59e0b" }, "& .MuiRating-iconEmpty": { color: "#ffffff18" } }}
                />
                <Typography variant="caption" color="text.secondary">{parseFloat(rating).toFixed(1)} / 5</Typography>
              </Box>
            )}

            {/* Badge */}
            <FormControl size="small" fullWidth sx={inputSx}>
              <InputLabel sx={{ "&.Mui-focused": { color: "#6366f1" } }}>Badge</InputLabel>
              <Select
                value={badge}
                label="Badge"
                onChange={(e) => setBadge(e.target.value)}
                MenuProps={{ PaperProps: { sx: { bgcolor: "#1c1c26", border: "1px solid #ffffff12", color: "#f1f5f9" } } }}
              >
                {BADGE_OPTIONS.map((b) => (
                  <MenuItem key={b} value={b}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="body2">{b}</Typography>
                      {b !== "None" && <BadgeChip badge={b} />}
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>

        <Divider sx={{ borderColor: "#ffffff10" }} />

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => { setDialogOpen(false); resetForm(); }} sx={{ color: "text.secondary", textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!canSave}
            sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2, px: 3 }}
          >
            {editingId ? "Save Changes" : "Add Product"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Delete Confirm ── */}
      <Dialog
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { backgroundImage: "none", backgroundColor: "#1c1c26", border: "1px solid #ffffff12", borderRadius: 3 } }}
      >
        <DialogTitle>
          <Typography fontWeight={700}>Delete Product?</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" variant="body2">
            This action cannot be undone. The product will be permanently removed from Firestore.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteConfirm(null)} sx={{ color: "text.secondary", textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(deleteConfirm)}
            sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}