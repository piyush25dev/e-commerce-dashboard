"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Box, Typography, Button, Link, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";

const NAV_LINKS = [
  { label: "Projects",   href: "/dashboard/projects" },
  { label: "Skills",     href: "/dashboard/skills" },
  { label: "Milestones", href: "/dashboard/milestones" },
];

export default function HomeNavbar() {
  const router   = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor:        scrolled ? "rgba(6,6,8,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(22px) saturate(180%)" : "none",
        borderBottom:   scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
        transition: "background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease",
        backgroundImage: "none",
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2.5, sm: 4, md: 7 },
          minHeight: "64px !important",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* ── Logo ── */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexShrink: 0 }}>
          <Box
            sx={{
              width:        32,
              height:       32,
              borderRadius: "10px",
              background:   "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow:    "0 0 18px rgba(99,102,241,0.45)",
              display:      "flex",
              alignItems:   "center",
              justifyContent: "center",
              fontSize:     "0.9rem",
              userSelect:   "none",
            }}
          >
            ✦
          </Box>
          <Typography
            sx={{
              fontFamily:    "'Syne', sans-serif",
              fontWeight:    800,
              fontSize:      "1rem",
              color:         "text.primary",
              letterSpacing: "-0.02em",
              lineHeight:    1,
            }}
          >
            Portfolio
            <Box component="span" sx={{ color: "primary.main" }}>.</Box>
          </Typography>
        </Box>

        {/* ── Right side ── */}
        <Stack direction="row" alignItems="center" gap={{ xs: 0.5, sm: 1.5, md: 3.5 }}>
          {/* Nav links hidden on mobile via .nav-link CSS class */}
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="nav-link"
              sx={{
                color:      "text.secondary",
                fontSize:   "0.875rem",
                fontWeight: 500,
                "&:hover":  { color: "text.primary" },
              }}
            >
              {label}
            </Link>
          ))}

          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={() => router.push("/dashboard")}
            sx={{
              px:         { xs: 2, sm: 2.75 },
              py:         0.875,
              fontSize:   "0.875rem",
              flexShrink: 0,
            }}
          >
            Open Dashboard →
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}