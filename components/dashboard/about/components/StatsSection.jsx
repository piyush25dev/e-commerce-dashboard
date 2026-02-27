// components/admin/about/StatsSection.jsx
import { useState } from "react";
import {
  Box,
  Button,
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
  alpha,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchIcon from "@mui/icons-material/Search";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import { doc, updateDoc, addDoc, deleteDoc, collection } from "firebase/firestore";
import { db } from "@/utils/firebase";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#ffffff18" },
    "&:hover fieldset": { borderColor: "#6366f166" },
    "&.Mui-focused fieldset": { borderColor: "#6366f1" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#6366f1" },
};

function StatRow({ stat, index, onEdit, onDelete }) {
  return (
    <TableRow>
      <TableCell sx={{ borderColor: "#ffffff0a", width: 48 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={700}>
          #{index + 1}
        </Typography>
      </TableCell>

      <TableCell sx={{ borderColor: "#ffffff0a" }}>
        <Typography variant="body2" fontWeight={700} color="text.primary">
          {stat.number}
        </Typography>
      </TableCell>

      <TableCell sx={{ borderColor: "#ffffff0a" }}>
        <Typography variant="body2" color="text.secondary">
          {stat.label}
        </Typography>
      </TableCell>

      <TableCell align="right" sx={{ borderColor: "#ffffff0a" }}>
        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => onEdit(stat)}
              sx={{ color: "primary.main", bgcolor: alpha("#6366f1", 0.08), "&:hover": { bgcolor: alpha("#6366f1", 0.18) } }}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={() => onDelete(stat.id)}
              sx={{ color: "error.main", bgcolor: alpha("#ef4444", 0.08), "&:hover": { bgcolor: alpha("#ef4444", 0.18) } }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default function StatsSection({ stats, loading, onRefresh }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [number, setNumber] = useState("");
  const [label, setLabel] = useState("");
  const [saving, setSaving] = useState(false);

  const filtered = stats
    .sort((a, b) => b.id.localeCompare(a.id))
    .filter((s) => s.label?.toLowerCase().includes(search.toLowerCase()));
  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const resetForm = () => {
    setNumber("");
    setLabel("");
    setEditingId(null);
  };

  const handleOpenDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!number.trim() || !label.trim()) return;

    setSaving(true);
    try {
      const data = { number: number.trim(), label: label.trim() };
      if (editingId) {
        await updateDoc(doc(db, "aboutStats", editingId), data);
      } else {
        await addDoc(collection(db, "aboutStats"), data);
      }
      setDialogOpen(false);
      resetForm();
      onRefresh();
    } catch (error) {
      console.error("Error saving stat:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "aboutStats", id));
      setDeleteConfirm(null);
      onRefresh();
    } catch (error) {
      console.error("Error deleting stat:", error);
    }
  };

  const openEdit = (stat) => {
    setEditingId(stat.id);
    setNumber(stat.number || "");
    setLabel(stat.label || "");
    setDialogOpen(true);
  };

  return (
    <Box>
      {/* Header */}
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} mb={3} spacing={2}>
        <Box>
          <Typography variant="h5" color="text.primary">Statistics</Typography>
          <Typography variant="body2" color="text.secondary">
            {stats.length} statistic{stats.length !== 1 ? "s" : ""} total
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <TextField
            size="small"
            placeholder="Search stats..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: 200,
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
            onClick={handleOpenDialog}
            sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "#4f46e5" }, borderRadius: 2, px: 2.5, textTransform: "none", fontWeight: 600 }}
          >
            Add Stat
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
                  { label: "#", width: 48 },
                  { label: "Number" },
                  { label: "Label" },
                  { label: "Actions", align: "right" },
                ].map(({ label, width, align }, i) => (
                  <TableCell
                    key={i}
                    align={align || "left"}
                    sx={{ bgcolor: "#1e1e28", color: "#94a3b8", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", ...(width ? { width } : {}) }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 8, borderColor: "#ffffff0a" }}>
                    <CodeOutlinedIcon sx={{ fontSize: 40, color: "text.secondary", mb: 1, display: "block", mx: "auto" }} />
                    <Typography color="text.secondary" variant="body2">
                      {search ? "No stats match your search." : "No stats yet. Add one!"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((stat, i) => (
                  <StatRow
                    key={stat.id}
                    stat={stat}
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
          onRowsPerPageChange={(e) => {
            setRowsPerPage(+e.target.value);
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{ color: "text.secondary", bgcolor: "#13131a", ".MuiTablePagination-select": { color: "text.primary" } }}
        />
      </Paper>

      {/* Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          resetForm();
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { backgroundImage: "none", backgroundColor: "#1c1c26", border: "1px solid #ffffff12", borderRadius: 3 } }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ width: 32, height: 32, borderRadius: "8px", bgcolor: alpha("#6366f1", 0.15), display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CodeOutlinedIcon sx={{ fontSize: 18, color: "#6366f1" }} />
            </Box>
            <Typography variant="h6" fontWeight={700}>
              {editingId ? "Edit Statistic" : "Add New Statistic"}
            </Typography>
          </Stack>
        </DialogTitle>

        <Divider sx={{ borderColor: "#ffffff10" }} />

        <DialogContent sx={{ pt: 2.5 }}>
          <Stack spacing={2.5}>
            <TextField
              label="Number *"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              fullWidth
              size="small"
              placeholder="e.g. 10K+, 500+, 4.8★"
              sx={inputSx}
            />

            <TextField
              label="Label *"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              fullWidth
              size="small"
              placeholder="e.g. Happy Customers"
              sx={inputSx}
            />

            {/* Preview */}
            {number && label && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha("#6366f1", 0.05),
                  border: `1px solid ${alpha("#6366f1", 0.15)}`,
                }}
              >
                <Typography variant="h4" sx={{ color: "#E8D5C4", fontWeight: 600 }}>
                  {number}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {label}
                </Typography>
              </Box>
            )}
          </Stack>
        </DialogContent>

        <Divider sx={{ borderColor: "#ffffff10" }} />

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={() => {
              setDialogOpen(false);
              resetForm();
            }}
            sx={{ color: "text.secondary", textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!number.trim() || !label.trim() || saving}
            sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2, px: 3 }}
          >
            {saving ? "Saving..." : editingId ? "Save Changes" : "Add Stat"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { backgroundImage: "none", backgroundColor: "#1c1c26", border: "1px solid #ffffff12", borderRadius: 3 } }}
      >
        <DialogTitle>
          <Typography fontWeight={700}>Delete Statistic?</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" variant="body2">
            This action cannot be undone. The statistic will be permanently removed from Firestore.
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