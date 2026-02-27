"use client";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useSyncExternalStore } from "react";
import StatPill from "./StatPill";
import DashboardMockup from "./DashboardMockup";

const STATS = [
  { label: "Projects",    value: "24+",       color: "#6366f1", delay: 420 },
  { label: "Skills",      value: "11+",       color: "#22d3ee", delay: 520 },
  { label: "Experience",  value: "2 roles",   color: "#10b981", delay: 620 },
  { label: "Live sync",   value: "Firestore", color: "#f59e0b", delay: 720 },
];

export default function HeroSection() {
  const router = useRouter();
  
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
    <Box
      component="section"
      sx={{
        minHeight:      "100vh",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        textAlign:      "center",
        px:  { xs: 2.5, sm: 4, md: 8 },
        pt:  "100px",
        pb:  "64px",
        // Add keyframe animations inline
        '@keyframes fadeUp': {
          from: {
            opacity: 0,
            transform: 'translateY(20px)'
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        '@keyframes pulseGlow': {
          '0%': {
            boxShadow: '0 0 7px #10b981',
            opacity: 0.8
          },
          '50%': {
            boxShadow: '0 0 15px #10b981',
            opacity: 1
          },
          '100%': {
            boxShadow: '0 0 7px #10b981',
            opacity: 0.8
          }
        }
      }}
    >
      {/* ── Live badge ── */}
      <Box
        sx={{
          display:        "inline-flex",
          alignItems:     "center",
          gap:            1,
          px:             2,
          py:             0.875,
          bgcolor:        alpha("#6366f1", 0.08),
          border:         "1px solid",
          borderColor:    alpha("#6366f1", 0.26),
          borderRadius:   "100px",
          mb:             4,
          animation:      "fadeUp 0.5s ease forwards",
          opacity:        0,
        }}
      >
        <Box
          sx={{
            width:        7,
            height:       7,
            borderRadius: "50%",
            bgcolor:      "success.main",
            boxShadow:    "0 0 7px #10b981",
            animation:    "pulseGlow 2.2s ease-in-out infinite",
            flexShrink:   0,
          }}
        />
        <Typography
          variant="overline"
          sx={{
            color:         "#a5b4fc",
            fontSize:      "0.7rem",
            letterSpacing: "0.08em",
            lineHeight:    1,
          }}
        >
          Portfolio Dashboard · Admin Panel
        </Typography>
      </Box>

      {/* ── Headline ── */}
      <Typography
        variant="h1"
        sx={{
          fontSize:       { xs: "2.5rem", sm: "3.75rem", md: "5rem", lg: "5.75rem" },
          lineHeight:     1.04,
          color:          "text.primary",
          maxWidth:       840,
          mb:             2.25,
          animation:      "fadeUp 0.65s ease forwards",
          animationDelay: "110ms",
          opacity:        0,
        }}
      >
        Manage Your{" "}
        <Box component="span" className="shimmer-text">
          Portfolio
        </Box>
        <br />
        Like a Pro
      </Typography>

      {/* ── Subtitle ── */}
      <Typography
        variant="body1"
        sx={{
          color:          "text.secondary",
          fontSize:       { xs: "1rem", sm: "1.1rem" },
          lineHeight:     1.8,
          maxWidth:       500,
          mb:             5,
          animation:      "fadeUp 0.65s ease forwards",
          animationDelay: "220ms",
          opacity:        0,
        }}
      >
        A powerful admin dashboard to manage projects, skills, experience and
        milestones — all synced live with Firebase Firestore.
      </Typography>

      {/* ── CTA buttons ── */}
      <Stack
        direction="row"
        spacing={1.5}
        flexWrap="wrap"
        justifyContent="center"
        sx={{
          mb:             7,
          animation:      "fadeUp 0.65s ease forwards",
          animationDelay: "330ms",
          opacity:        0,
          gap:            1.5,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => router.push("/dashboard")}
          sx={{ px: 4, py: 1.5, fontSize: "0.95rem" }}
        >
          🚀 Enter Dashboard
        </Button>

        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => router.push("/dashboard/projects")}
          sx={{ px: 3.5, py: 1.5, fontSize: "0.95rem" }}
        >
          View Projects →
        </Button>
      </Stack>

      {/* ── Stat pills ── */}
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        sx={{ gap: 1.25, mb: 9 }}
      >
        {STATS.map((s) => (
          <StatPill key={s.label} {...s} />
        ))}
      </Stack>

      {/* ── Browser mockup ── */}
      <DashboardMockup />
    </Box>
  );
}