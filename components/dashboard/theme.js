import { createTheme, alpha } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6366f1" },
    secondary: { main: "#22d3ee" },
    background: { default: "#0b0b10", paper: "#13131a" },
    text: { primary: "#f1f5f9", secondary: "#64748b" },
    error: { main: "#ef4444" },
    warning: { main: "#f59e0b" },
    success: { main: "#10b981" },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: "'Syne', 'DM Sans', sans-serif",
    h5: { fontWeight: 800, letterSpacing: "-0.5px" },
    h6: { fontWeight: 700 },
    body2: { fontFamily: "'DM Sans', sans-serif" },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          margin: "2px 8px",
          padding: "8px 12px",
          transition: "all 0.2s ease",
          "&:hover": { backgroundColor: alpha("#6366f1", 0.1) },
          "&.Mui-selected": {
            backgroundColor: alpha("#6366f1", 0.15),
            "&:hover": { backgroundColor: alpha("#6366f1", 0.2) },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: "none",
          backgroundColor: "#0e0e16",
          borderRight: "1px solid #ffffff08",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#0b0b10cc",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #ffffff08",
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", fontWeight: 600 } },
    },
  },
});