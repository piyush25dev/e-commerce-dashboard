"use client";
import { Box, Typography } from "@mui/material";
import { useSyncExternalStore } from "react";
import FeatureCard from "./FeatureCard";

const FEATURES = [
  {
    icon:  "🗂️",
    title: "Projects CRUD",
    desc:  "Add, edit, delete and showcase projects with tech stacks, GitHub links, and live demo URLs.",
    color: "#6366f1",
    delay: 0,
  },
  {
    icon:  "⚡",
    title: "Skills Manager",
    desc:  "Manage your tech skills with icon previews. Supports image URLs and local SVG paths.",
    color: "#22d3ee",
    delay: 80,
  },
  {
    icon:  "🏆",
    title: "Milestones",
    desc:  "Track your career journey with date-range experience entries styled as a visual timeline.",
    color: "#f59e0b",
    delay: 160,
  },
  {
    icon:  "📊",
    title: "Live Overview",
    desc:  "Overview dashboard fetches real-time counts and recent entries from all Firestore collections.",
    color: "#10b981",
    delay: 240,
  },
  {
    icon:  "🔗",
    title: "Route-Based Nav",
    desc:  "Each section is a real Next.js App Router route with deep-linking and browser history support.",
    color: "#8b5cf6",
    delay: 320,
  },
  {
    icon:  "📱",
    title: "Fully Responsive",
    desc:  "Works on mobile, tablet and desktop with a collapsible sidebar and adaptive grid layouts.",
    color: "#ec4899",
    delay: 400,
  },
];

export default function FeaturesSection() {
  // This ensures we only render on the client
  const isClient = useSyncExternalStore(
    () => () => {}, // subscribe (no-op)
    () => true,     // client snapshot
    () => false     // server snapshot
  );

  if (!isClient) {
    return null; // Return nothing on the server
  }

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 2.5, sm: 4, md: 8, lg: 12 },
        maxWidth: 1160,
        mx: "auto",
        width: "100%",
      }}
    >
      {/* ── Section header ── */}
      <Box sx={{ textAlign: "center", mb: 7 }}>
        <Typography
          variant="overline"
          sx={{
            color:    "primary.main",
            display:  "block",
            mb:       1.5,
          }}
        >
          Everything you need
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontSize:   { xs: "1.85rem", sm: "2.4rem", md: "2.85rem" },
            lineHeight: 1.2,
            color:      "text.primary",
          }}
        >
          Built for your portfolio,
          <br />
          <Box component="span" sx={{ color: "text.secondary" }}>
            powered by Firestore
          </Box>
        </Typography>
      </Box>

      {/* ── Card grid ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(3, 1fr)",
          },
          gap: 2.25,
        }}
      >
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </Box>
    </Box>
  );
}