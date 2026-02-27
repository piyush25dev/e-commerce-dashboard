"use client";
import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";

// Shared blob sx factory
const blob = (extra) => ({
  position: "absolute",
  borderRadius: "50%",
  pointerEvents: "none",
  ...extra,
});

export default function GridBackground() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* ── Solid base ── */}
      <Box sx={{ position: "absolute", inset: 0, bgcolor: "#060608" }} />

      {/* ── Grid lines ── */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${alpha("#6366f1", 0.055)} 1px, transparent 1px),
            linear-gradient(90deg, ${alpha("#6366f1", 0.055)} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Centre radial vignette ── */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 55% at 50% 50%, transparent 25%, #060608 100%)",
        }}
      />

      {/* ── Purple blob — top-left ── */}
      <Box
        sx={blob({
          top: "-18%",
          left: "-8%",
          width: "58vw",
          height: "58vw",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 70%)",
          filter: "blur(48px)",
          animation: "floatA 9s ease-in-out infinite",
        })}
      />

      {/* ── Cyan blob — bottom-right ── */}
      <Box
        sx={blob({
          bottom: "-18%",
          right: "-8%",
          width: "50vw",
          height: "50vw",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.13) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "floatB 11s ease-in-out infinite",
        })}
      />

      {/* ── Violet blob — centre-right ── */}
      <Box
        sx={blob({
          top: "38%",
          left: "58%",
          width: "32vw",
          height: "32vw",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 70%)",
          filter: "blur(52px)",
          animation: "floatC 13s ease-in-out infinite",
        })}
      />
    </Box>
  );
}