"use client";
import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

/**
 * StatPill — a small glowing label + value chip
 * @param {string}  label  — left dim text
 * @param {string}  value  — right bold colored text
 * @param {string}  color  — hex accent color
 * @param {number}  delay  — animation stagger in ms
 */
export default function StatPill({ label, value, color, delay = 0 }) {
  return (
    <Box
      sx={{
        display:        "inline-flex",
        alignItems:     "center",
        gap:            1,
        px:             2,
        py:             0.875,
        bgcolor:        alpha("#ffffff", 0.028),
        border:         "1px solid",
        borderColor:    alpha(color, 0.28),
        borderRadius:   "100px",
        backdropFilter: "blur(12px)",
        flexShrink:     0,
        animation:      "fadeUp 0.55s ease forwards",
        animationDelay: `${delay}ms`,
        opacity:        0,
      }}
    >
      {/* Glowing dot */}
      <Box
        sx={{
          width:     7,
          height:    7,
          borderRadius: "50%",
          bgcolor:   color,
          boxShadow: `0 0 8px ${color}`,
          flexShrink: 0,
        }}
      />

      <Typography
        variant="caption"
        sx={{
          color:      "text.secondary",
          fontSize:   "0.74rem",
          lineHeight: 1,
        }}
      >
        {label}
      </Typography>

      <Typography
        variant="caption"
        sx={{
          color:       color,
          fontWeight:  700,
          fontFamily:  "'Syne', sans-serif",
          fontSize:    "0.78rem",
          lineHeight:  1,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}