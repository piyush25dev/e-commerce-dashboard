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

// ─── MUI Imports ──────────────────────────────────────────────────────────────
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
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
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
  InputAdornment,
  Avatar,
  LinearProgress,
  Collapse,
  List,
  ListItem,
  ListItemText,
  alpha,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchIcon from "@mui/icons-material/Search";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import GitHubIcon from "@mui/icons-material/GitHub";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FolderSpecialOutlinedIcon from "@mui/icons-material/FolderSpecialOutlined";

// ─── Theme ────────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6366f1" },
    secondary: { main: "#22d3ee" },
    background: { default: "#0f0f13", paper: "#18181f" },
    text: { primary: "#f1f5f9", secondary: "#94a3b8" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h5: { fontWeight: 700, letterSpacing: "-0.5px" },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#1e1e28",
          color: "#94a3b8",
          fontWeight: 600,
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        },
        body: { borderColor: "#ffffff0a" },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": { backgroundColor: "#ffffff05" },
          transition: "background 0.15s",
        },
      },
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", fontWeight: 600 } },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: "none",
          backgroundColor: "#1c1c26",
          border: "1px solid #ffffff12",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#ffffff18" },
            "&:hover fieldset": { borderColor: "#6366f166" },
            "&.Mui-focused fieldset": { borderColor: "#6366f1" },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600, fontSize: "0.7rem" } },
    },
  },
});

// ─── Tech color map ───────────────────────────────────────────────────────────
const techColors = {
  "Next.js": "#fff",
  React: "#61dafb",
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  "Tailwind CSS": "#38bdf8",
  "Material UI": "#0081cb",
  "Framer Motion": "#ff4154",
  Firebase: "#ffca28",
  "Node.js": "#68a063",
  MongoDB: "#47a248",
  PostgreSQL: "#336791",
  GraphQL: "#e535ab",
};
const getTechColor = (tech) => techColors[tech] || "#6366f1";

// ─── Empty form state ─────────────────────────────────────────────────────────
const emptyForm = {
  title: "",
  description: "",
  technologies: "",
  image: "",
  link: "#",
  detailedDescription: "",
  features: "",
  challenges: "",
  solutions: "",
  github: "",
  demoUrl: "",
};

// ─── Expandable Row ───────────────────────────────────────────────────────────
function ProjectRow({ project, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {/* Expand toggle */}
        <TableCell sx={{ width: 48, pr: 0 }}>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ color: "text.secondary" }}
          >
            {open ? (
              <KeyboardArrowUpIcon fontSize="small" />
            ) : (
              <KeyboardArrowDownIcon fontSize="small" />
            )}
          </IconButton>
        </TableCell>

        {/* Title */}
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar
              src={project.image}
              variant="rounded"
              sx={{
                width: 36,
                height: 36,
                bgcolor: alpha(
                  getTechColor(project.technologies?.[0] || "#6366f1"),
                  0.15,
                ),
                fontSize: "1rem",
              }}
            >
              <FolderSpecialOutlinedIcon
                fontSize="small"
                sx={{
                  color: getTechColor(project.technologies?.[0] || "#6366f1"),
                }}
              />
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight={700} color="text.primary">
                {project.title}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                noWrap
                sx={{ maxWidth: 220, display: "block" }}
              >
                {project.description}
              </Typography>
            </Box>
          </Stack>
        </TableCell>

        {/* Technologies */}
        <TableCell>
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={0.5}
            sx={{ maxWidth: 280 }}
          >
            {(project.technologies || []).slice(0, 4).map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  bgcolor: alpha(getTechColor(tech), 0.12),
                  color: getTechColor(tech),
                  border: `1px solid ${alpha(getTechColor(tech), 0.25)}`,
                }}
              />
            ))}
            {(project.technologies || []).length > 4 && (
              <Chip
                label={`+${project.technologies.length - 4}`}
                size="small"
                sx={{ bgcolor: "#ffffff0a", color: "text.secondary" }}
              />
            )}
          </Stack>
        </TableCell>

        {/* Links */}
        <TableCell>
          <Stack direction="row" spacing={1}>
            {project.github && (
              <Tooltip title="GitHub">
                <IconButton
                  size="small"
                  href={project.github}
                  target="_blank"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {project.demoUrl && (
              <Tooltip title="Live Demo">
                <IconButton
                  size="small"
                  href={project.demoUrl}
                  target="_blank"
                  sx={{
                    color: "secondary.main",
                    "&:hover": { color: "secondary.light" },
                  }}
                >
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </TableCell>

        {/* Actions */}
        <TableCell align="right">
          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={() => onEdit(project)}
                sx={{
                  color: "primary.main",
                  bgcolor: alpha("#6366f1", 0.08),
                  "&:hover": { bgcolor: alpha("#6366f1", 0.18) },
                }}
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={() => onDelete(project.id)}
                sx={{
                  color: "error.main",
                  bgcolor: alpha("#ef4444", 0.08),
                  "&:hover": { bgcolor: alpha("#ef4444", 0.18) },
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>

      {/* Expanded detail */}
      <TableRow>
        <TableCell colSpan={5} sx={{ py: 0, bgcolor: "#0f0f1399" }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ py: 2, px: 3 }}>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {project.detailedDescription}
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                {[
                  { label: "✦ Features", items: project.features },
                  { label: "⚡ Challenges", items: project.challenges },
                  { label: "✓ Solutions", items: project.solutions },
                ].map(
                  ({ label, items }) =>
                    items?.length > 0 && (
                      <Box key={label} flex={1}>
                        <Typography
                          variant="caption"
                          color="primary.main"
                          fontWeight={700}
                          mb={0.5}
                          display="block"
                        >
                          {label}
                        </Typography>
                        <List dense disablePadding>
                          {items.map((item, i) => (
                            <ListItem key={i} disablePadding sx={{ py: 0.25 }}>
                              <ListItemText
                                primary={item}
                                primaryTypographyProps={{
                                  variant: "caption",
                                  color: "text.secondary",
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    ),
                )}
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // id to delete

  // ── Firestore helpers ──────────────────────────────────────────────────────
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "projects"));
      setProjects(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const parseArrayField = (val) =>
    typeof val === "string"
      ? val
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : val || [];

  const formToDoc = (f) => ({
    title: f.title,
    description: f.description,
    technologies: parseArrayField(f.technologies),
    image: f.image,
    link: f.link,
    detailedDescription: f.detailedDescription,
    features: parseArrayField(f.features),
    challenges: parseArrayField(f.challenges),
    solutions: parseArrayField(f.solutions),
    github: f.github,
    demoUrl: f.demoUrl,
  });

  const handleSave = async () => {
    const data = formToDoc(form);
    if (!data.title) return;
    if (editingId) {
      await updateDoc(doc(db, "projects", editingId), data);
    } else {
      await addDoc(collection(db, "projects"), data);
    }
    setDialogOpen(false);
    fetchProjects();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "projects", id));
    setDeleteConfirm(null);
    fetchProjects();
  };

  const openEdit = (project) => {
    setEditingId(project.id);
    setForm({
      title: project.title || "",
      description: project.description || "",
      technologies: (project.technologies || []).join("\n"),
      image: project.image || "",
      link: project.link || "#",
      detailedDescription: project.detailedDescription || "",
      features: (project.features || []).join("\n"),
      challenges: (project.challenges || []).join("\n"),
      solutions: (project.solutions || []).join("\n"),
      github: project.github || "",
      demoUrl: project.demoUrl || "",
    });
    setDialogOpen(true);
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  // ── Filtering & pagination ─────────────────────────────────────────────────
  const filtered = projects
    .sort((a, b) => b.id.localeCompare(a.id)) // Sort by ID in reverse (newest first)
    .filter((p) =>
      [p.title, p.description, ...(p.technologies || [])]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

  const paginated = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <ThemeProvider theme={theme}>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          p: { xs: 2, md: 4 },
        }}
      >
        {/* Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ sm: "center" }}
          mb={3}
          spacing={2}
        >
          <Box>
            <Typography variant="h5" color="text.primary">
              Projects
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {projects.length} project{projects.length !== 1 ? "s" : ""} total
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <TextField
              size="small"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{ color: "text.secondary", fontSize: 18 }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 220 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={openAdd}
              sx={{
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "#4f46e5" },
                borderRadius: 2,
                px: 2.5,
              }}
            >
              Add Project
            </Button>
          </Stack>
        </Stack>

        {/* Table */}
        <Paper
          elevation={0}
          sx={{
            border: "1px solid #ffffff0d",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          {loading && <LinearProgress color="primary" sx={{ height: 2 }} />}

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 48, pr: 0 }} />
                  <TableCell>Project</TableCell>
                  <TableCell>Technologies</TableCell>
                  <TableCell>Links</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                      <FolderSpecialOutlinedIcon
                        sx={{ fontSize: 40, color: "text.secondary", mb: 1 }}
                      />
                      <Typography color="text.secondary" variant="body2">
                        {search
                          ? "No projects match your search."
                          : "No projects yet. Add one!"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginated.map((project) => (
                    <ProjectRow
                      key={project.id}
                      project={project}
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
            sx={{
              color: "text.secondary",
              ".MuiTablePagination-select": { color: "text.primary" },
            }}
          />
        </Paper>

        {/* ── Add / Edit Dialog ── */}
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h6" component="span" fontWeight={700}>
              {editingId ? "Edit Project" : "Add New Project"}
            </Typography>
          </DialogTitle>
          <Divider sx={{ borderColor: "#ffffff10" }} />
          <DialogContent sx={{ pt: 2 }}>
            <Stack spacing={2}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Title *"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Image URL"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  fullWidth
                  size="small"
                />
              </Stack>

              <TextField
                label="Short Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                fullWidth
                size="small"
                multiline
                rows={2}
              />
              <TextField
                label="Detailed Description"
                value={form.detailedDescription}
                onChange={(e) =>
                  setForm({ ...form, detailedDescription: e.target.value })
                }
                fullWidth
                size="small"
                multiline
                rows={3}
              />

              <TextField
                label="Technologies (one per line)"
                value={form.technologies}
                onChange={(e) =>
                  setForm({ ...form, technologies: e.target.value })
                }
                fullWidth
                size="small"
                multiline
                rows={3}
                helperText="e.g. Next.js  /  React  /  TypeScript"
                FormHelperTextProps={{ sx: { color: "text.secondary" } }}
              />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="GitHub URL"
                  value={form.github}
                  onChange={(e) => setForm({ ...form, github: e.target.value })}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Demo URL"
                  value={form.demoUrl}
                  onChange={(e) =>
                    setForm({ ...form, demoUrl: e.target.value })
                  }
                  fullWidth
                  size="small"
                />
              </Stack>

              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <TextField
                  label="Features (one per line)"
                  value={form.features}
                  onChange={(e) =>
                    setForm({ ...form, features: e.target.value })
                  }
                  fullWidth
                  size="small"
                  multiline
                  rows={3}
                />
                <TextField
                  label="Challenges (one per line)"
                  value={form.challenges}
                  onChange={(e) =>
                    setForm({ ...form, challenges: e.target.value })
                  }
                  fullWidth
                  size="small"
                  multiline
                  rows={3}
                />
                <TextField
                  label="Solutions (one per line)"
                  value={form.solutions}
                  onChange={(e) =>
                    setForm({ ...form, solutions: e.target.value })
                  }
                  fullWidth
                  size="small"
                  multiline
                  rows={3}
                />
              </Stack>
            </Stack>
          </DialogContent>
          <Divider sx={{ borderColor: "#ffffff10" }} />
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button
              onClick={() => setDialogOpen(false)}
              sx={{ color: "text.secondary" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!form.title}
            >
              {editingId ? "Save Changes" : "Add Project"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* ── Delete Confirm Dialog ── */}
        <Dialog
          open={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>
            <Typography fontWeight={700}>Delete Project?</Typography>
          </DialogTitle>
          <DialogContent>
            <Typography color="text.secondary" variant="body2">
              This action cannot be undone. The project will be permanently
              removed from Firestore.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={() => setDeleteConfirm(null)}
              sx={{ color: "text.secondary" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(deleteConfirm)}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}