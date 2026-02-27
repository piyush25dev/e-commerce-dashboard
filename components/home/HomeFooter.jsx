"use client";
import { Box, Typography, Link, Stack, Divider } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useSyncExternalStore } from "react";

const FOOTER_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects",  href: "/dashboard/projects" },
  { label: "Skills",    href: "/dashboard/skills" },
];

export default function HomeFooter() {
  // This ensures we only render on the client
  const isClient = useSyncExternalStore(
    () => () => {}, // subscribe (no-op)
    () => true,     // client snapshot
    () => false     // server snapshot
  );

  if (!isClient) {
    return null; // Return nothing on the server to prevent hydration mismatch
  }

  return (
    <Box component="footer">
      <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />

      <Box
        sx={{
          px:             { xs: 2.5, sm: 4, md: 8 },
          py:             2.75,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          flexWrap:       "wrap",
          gap:            2,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width:          24,
              height:         24,
              borderRadius:   "7px",
              background:     "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              fontSize:       "0.62rem",
              flexShrink:     0,
            }}
          >
            ✦
          </Box>
          <Typography
            sx={{
              color:      alpha("#f1f5f9", 0.22),
              fontSize:   "0.8rem",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
            }}
          >
            Portfolio Dashboard
          </Typography>
        </Box>

        {/* Build stack */}
        <Typography
          variant="caption"
          sx={{ color: alpha("#f1f5f9", 0.12) }}
        >
          Built with Next.js · Firebase · Material UI
        </Typography>

        {/* Quick links */}
        <Stack direction="row" spacing={3}>
          {FOOTER_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              sx={{
                color:    alpha("#f1f5f9", 0.2),
                fontSize: "0.75rem",
                "&:hover": { color: alpha("#f1f5f9", 0.5) },
              }}
            >
              {label}
            </Link>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}