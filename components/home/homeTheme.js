import { createTheme } from "@mui/material/styles";

export const homeTheme = createTheme({
  palette: {
    mode: "dark",
    primary:    { main: "#6366f1", dark: "#4f46e5", light: "#818cf8" },
    secondary:  { main: "#22d3ee" },
    success:    { main: "#10b981" },
    warning:    { main: "#f59e0b" },
    error:      { main: "#ef4444" },
    background: { default: "#060608", paper: "#0e0e16" },
    text:       { primary: "#f1f5f9", secondary: "#64748b", disabled: "#334155" },
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h1: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 900,
      letterSpacing: "-0.03em",
    },
    h2: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
      letterSpacing: "-0.025em",
    },
    h3: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 700,
    },
    overline: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 700,
      letterSpacing: "0.15em",
      fontSize: "0.72rem",
    },
    caption: {
      fontFamily: "'DM Sans', sans-serif",
    },
    button: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 700,
      textTransform: "none",
      letterSpacing: "0.02em",
    },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 700,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.02em",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
            boxShadow: "0 8px 32px rgba(99,102,241,0.5)",
            transform: "translateY(-2px)",
          },
          transition: "all 0.25s ease !important",
        },
        outlinedPrimary: {
          borderColor: "rgba(255,255,255,0.12)",
          color: "#94a3b8",
          "&:hover": {
            borderColor: "rgba(255,255,255,0.28)",
            backgroundColor: "rgba(255,255,255,0.04)",
            color: "#f1f5f9",
            transform: "translateY(-2px)",
          },
          transition: "all 0.25s ease !important",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "none",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: "'DM Sans', sans-serif",
          textDecoration: "none",
          transition: "color 0.2s ease",
        },
      },
    },
  },
});