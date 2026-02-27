"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box, Typography, TextField, Button, InputAdornment,
  IconButton, Alert, CircularProgress, Divider,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Eye, EyeOff, Lock, User, Sparkles, ShieldCheck } from "lucide-react";

// ── Shared input sx ────────────────────────────────────────────────────────────
const inputSx = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    bgcolor:      "rgba(255,255,255,0.03)",
    borderRadius: "12px",
    fontFamily:   "'DM Sans', sans-serif",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset":  { borderColor: "rgba(255,255,255,0.2)" },
    "&.Mui-focused fieldset": { borderColor: "#6366f1", borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'DM Sans', sans-serif",
    "&.Mui-focused": { color: "#6366f1" },
  },
  "& .MuiInputAdornment-root .MuiSvgIcon-root": { color: "#64748b" },
};

export default function LoginPage() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const redirectTo   = searchParams.get("from") || "/dashboard";

  const [id,          setId]          = useState("");
  const [password,    setPassword]    = useState("");
  const [showPass,    setShowPass]    = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id.trim() || !password.trim()) {
      setError("Please enter both ID and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ id: id.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed. Please try again.");
        return;
      }

      // Success — navigate to the originally requested page
      router.push(redirectTo);
      router.refresh(); // force middleware re-evaluation
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight:      "100vh",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        bgcolor:        "#060608",
        position:       "relative",
        overflow:       "hidden",
        px:             2,
      }}
    >
      {/* ── Animated background blobs ── */}
      <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {/* Grid */}
        <Box sx={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(${alpha("#6366f1", 0.05)} 1px, transparent 1px),
            linear-gradient(90deg, ${alpha("#6366f1", 0.05)} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }} />
        {/* Vignette */}
        <Box sx={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, #060608 100%)" }} />
        {/* Purple blob */}
        <Box sx={{ position: "absolute", top: "-20%", left: "-10%", width: "55vw", height: "55vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)", filter: "blur(50px)" }} />
        {/* Cyan blob */}
        <Box sx={{ position: "absolute", bottom: "-20%", right: "-10%", width: "45vw", height: "45vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.10) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </Box>

      {/* ── Login card ── */}
      <Box
        sx={{
          position:      "relative",
          zIndex:        1,
          width:         "100%",
          maxWidth:      420,
          bgcolor:       "#0e0e16",
          border:        "1px solid rgba(255,255,255,0.08)",
          borderRadius:  "24px",
          p:             { xs: 3.5, sm: 5 },
          boxShadow:     "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.08)",
          overflow:      "hidden",
        }}
      >
        {/* Card top-glow */}
        <Box sx={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 280, height: 160, background: "radial-gradient(ellipse, rgba(99,102,241,0.2) 0%, transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />

        {/* ── Header ── */}
        <Box sx={{ textAlign: "center", mb: 4, position: "relative" }}>
          {/* Logo mark */}
          <Box
            sx={{
              width:          52,
              height:         52,
              borderRadius:   "16px",
              background:     "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow:      "0 0 24px rgba(99,102,241,0.45)",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              mx:             "auto",
              mb:             2.5,
            }}
          >
            <Sparkles size={24} color="#fff" />
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontFamily:    "'Syne', sans-serif",
              fontWeight:    800,
              color:         "text.primary",
              letterSpacing: "-0.02em",
              mb:            0.75,
            }}
          >
            Admin Login
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Sign in to manage your portfolio
          </Typography>
        </Box>

        {/* ── Error alert ── */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb:           2.5,
              bgcolor:      "rgba(239,68,68,0.08)",
              border:       "1px solid rgba(239,68,68,0.2)",
              borderRadius: "12px",
              color:        "#fca5a5",
              "& .MuiAlert-icon": { color: "#ef4444" },
              fontFamily:   "'DM Sans', sans-serif",
              fontSize:     "0.875rem",
            }}
          >
            {error}
          </Alert>
        )}

        {/* ── Form ── */}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.25 }}>

            {/* Admin ID */}
            <TextField
              label="Admin ID"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              fullWidth
              autoComplete="username"
              autoFocus
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User size={16} color="#64748b" />
                  </InputAdornment>
                ),
              }}
              sx={inputSx}
            />

            {/* Password */}
            <TextField
              label="Password"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              autoComplete="current-password"
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={16} color="#64748b" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => setShowPass((p) => !p)}
                      tabIndex={-1}
                      sx={{ color: "#64748b", "&:hover": { color: "text.primary" } }}
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={inputSx}
            />

          </Box>

          {/* ── Submit ── */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading || !id.trim() || !password.trim()}
            sx={{
              mt:         3,
              py:         1.5,
              fontSize:   "0.95rem",
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              boxShadow:  "0 4px 20px rgba(99,102,241,0.3)",
              textTransform: "none",
              letterSpacing: "0.02em",
              "&:hover": {
                background: "linear-gradient(135deg, #4f46e5, #4338ca)",
                boxShadow:  "0 8px 32px rgba(99,102,241,0.5)",
                transform:  "translateY(-1px)",
              },
              "&:disabled": {
                background: "rgba(99,102,241,0.25)",
                color:      "rgba(255,255,255,0.35)",
                boxShadow:  "none",
              },
              transition: "all 0.25s ease",
            }}
          >
            {loading ? (
              <CircularProgress size={20} sx={{ color: "rgba(255,255,255,0.7)" }} />
            ) : (
              "Sign In →"
            )}
          </Button>
        </Box>

        {/* ── Footer note ── */}
        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", my: 3 }} />
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
          <ShieldCheck size={14} color="#334155" />
          <Typography variant="caption" sx={{ color: "#334155", fontFamily: "'DM Sans',sans-serif" }}>
            Credentials are set via environment variables
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}