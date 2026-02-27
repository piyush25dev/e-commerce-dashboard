"use client";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

/**
 * FeatureCard — animated card with hover lift, color accent line, and corner glow
 */
export default function FeatureCard({ icon, title, desc, color, delay = 0 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position:       "relative",
        p:              { xs: 3, md: 3.5 },
        bgcolor:        hovered ? alpha("#ffffff", 0.038) : alpha("#ffffff", 0.018),
        border:         "1px solid",
        borderColor:    hovered ? alpha(color, 0.38) : "rgba(255,255,255,0.06)",
        borderRadius:   "20px",
        cursor:         "default",
        overflow:       "hidden",
        transition:     "all 0.3s ease",
        transform:      hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow:      hovered ? `0 16px 40px rgba(0,0,0,0.3), 0 0 0 1px ${alpha(color, 0.15)}` : "none",
        animation:      "fadeUp 0.7s ease forwards",
        animationDelay: `${delay}ms`,
        opacity:        0,
      }}
    >
      {/* Animated top accent line */}
      <Box
        sx={{
          position:   "absolute",
          top:        0,
          left:       0,
          right:      0,
          height:     "2px",
          background: hovered
            ? `linear-gradient(90deg, transparent 0%, ${color} 40%, ${alpha(color, 0.4)} 100%)`
            : "transparent",
          transition: "background 0.35s ease",
        }}
      />

      {/* Corner glow blob — visible on hover */}
      <Box
        sx={{
          position:      "absolute",
          bottom:        -48,
          right:         -24,
          width:         140,
          height:        140,
          borderRadius:  "50%",
          background:    `radial-gradient(circle, ${alpha(color, 0.18)} 0%, transparent 70%)`,
          filter:        "blur(22px)",
          pointerEvents: "none",
          opacity:       hovered ? 1 : 0,
          transition:    "opacity 0.35s ease",
        }}
      />

      {/* Icon badge */}
      <Box
        sx={{
          width:        50,
          height:       50,
          borderRadius: "14px",
          bgcolor:      alpha(color, 0.12),
          border:       "1px solid",
          borderColor:  alpha(color, 0.26),
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
          fontSize:     "1.4rem",
          mb:           2.25,
          boxShadow:    hovered ? `0 0 20px ${alpha(color, 0.25)}` : "none",
          transition:   "box-shadow 0.3s ease",
        }}
      >
        {icon}
      </Box>

      <Typography
        variant="h3"
        sx={{
          fontSize:  "1rem",
          fontWeight: 700,
          color:     "text.primary",
          mb:        1,
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color:      "text.secondary",
          lineHeight: 1.72,
          fontSize:   "0.875rem",
        }}
      >
        {desc}
      </Typography>
    </Box>
  );
}