"use client";
import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

const TRAFFIC_LIGHTS = ["#ef4444", "#f59e0b", "#10b981"];
const STAT_DATA      = [["#6366f1","24"],["#22d3ee","11"],["#10b981","3"]];
const PROJECT_NAMES  = ["E-Commerce Dashboard","Portfolio v2","SaaS Landing","Admin Panel"];
const DOT_COLORS     = ["#6366f1","#22d3ee","#f59e0b","#10b981"];
const SKILL_TAGS     = ["React","Next.js","TS","Tailwind","Firebase","MUI"];
const SIDEBAR_COLORS = ["#6366f1","#94a3b8","#94a3b8","#94a3b8","#94a3b8"];

export default function DashboardMockup() {
  return (
    <Box
      sx={{
        position:       "relative",
        width:          "100%",
        maxWidth:       680,
        mx:             "auto",
        animation:      "fadeUp 0.9s ease forwards",
        animationDelay: "620ms",
        opacity:        0,
      }}
    >
      {/* Under-glow */}
      <Box
        sx={{
          position:  "absolute",
          bottom:    -56,
          left:      "50%",
          transform: "translateX(-50%)",
          width:     "68%",
          height:    90,
          background:"radial-gradient(ellipse, rgba(99,102,241,0.38) 0%, transparent 70%)",
          filter:    "blur(28px)",
          pointerEvents: "none",
        }}
      />

      {/* Browser chrome */}
      <Box
        sx={{
          background: "linear-gradient(145deg, #13131a, #0e0e16)",
          border:     "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          overflow:   "hidden",
          boxShadow:  "0 40px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(99,102,241,0.09)",
        }}
      >
        {/* Title bar */}
        <Box
          sx={{
            display:      "flex",
            alignItems:   "center",
            gap:          1,
            px:           2.5,
            py:           1.625,
            bgcolor:      "rgba(0,0,0,0.22)",
            borderBottom: "1px solid rgba(255,255,255,0.055)",
          }}
        >
          {/* Traffic lights */}
          <Box sx={{ display: "flex", gap: 0.75 }}>
            {TRAFFIC_LIGHTS.map((c) => (
              <Box key={c} sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: c, opacity: 0.72 }} />
            ))}
          </Box>

          {/* Fake URL bar */}
          <Box
            sx={{
              flex:           1,
              maxWidth:       260,
              mx:             "auto",
              height:         22,
              bgcolor:        "rgba(255,255,255,0.04)",
              borderRadius:   "6px",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ color: "#334155", fontSize: "0.62rem", fontFamily: "monospace" }}>
              localhost:3000/dashboard
            </Typography>
          </Box>
        </Box>

        {/* Dashboard body */}
        <Box sx={{ display: "flex", height: 340 }}>

          {/* ── Sidebar ── */}
          <Box
            sx={{
              width:          52,
              bgcolor:        "#0e0e16",
              borderRight:    "1px solid rgba(255,255,255,0.05)",
              p:              "14px 10px",
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              gap:            1,
            }}
          >
            {/* Logo mark */}
            <Box
              sx={{
                width:      28,
                height:     28,
                borderRadius: "8px",
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                mb:         1,
                boxShadow:  "0 0 12px rgba(99,102,241,0.4)",
              }}
            />

            {/* Nav icons */}
            {SIDEBAR_COLORS.map((c, i) => (
              <Box
                key={i}
                sx={{
                  width:       32,
                  height:      32,
                  borderRadius:"8px",
                  bgcolor:     i === 0 ? alpha(c, 0.14) : "rgba(255,255,255,0.03)",
                  border:      i === 0 ? `1px solid ${alpha(c, 0.38)}` : "none",
                  display:     "flex",
                  alignItems:  "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width:       14,
                    height:      14,
                    borderRadius:"3px",
                    bgcolor:     i === 0 ? c : "rgba(255,255,255,0.13)",
                    opacity:     i === 0 ? 1 : 0.38,
                  }}
                />
              </Box>
            ))}
          </Box>

          {/* ── Main content ── */}
          <Box sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column", gap: 1.25 }}>

            {/* Stat cards row */}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1 }}>
              {STAT_DATA.map(([c, v], i) => (
                <Box
                  key={i}
                  sx={{
                    p:           "10px 11px",
                    bgcolor:     alpha(c, 0.08),
                    border:      `1px solid ${alpha(c, 0.22)}`,
                    borderRadius:"10px",
                    position:    "relative",
                    overflow:    "hidden",
                  }}
                >
                  {/* Top accent line */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0, left: 0, right: 0,
                      height: 2,
                      background: `linear-gradient(90deg, ${c} 0%, transparent 100%)`,
                    }}
                  />
                  <Typography sx={{ color: "#64748b", fontSize: "0.48rem", mb: 0.5, fontFamily: "'DM Sans',sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Total
                  </Typography>
                  <Typography sx={{ color: "#f1f5f9", fontSize: "1rem", fontWeight: 800, fontFamily: "'Syne',sans-serif" }}>
                    {v}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Two-column cards */}
            <Box sx={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: 1, flex: 1, minHeight: 0 }}>

              {/* Projects list */}
              <Box
                sx={{
                  bgcolor:       "rgba(255,255,255,0.02)",
                  border:        "1px solid rgba(255,255,255,0.055)",
                  borderRadius:  "10px",
                  p:             "10px 11px",
                  display:       "flex",
                  flexDirection: "column",
                  gap:           0.625,
                  overflow:      "hidden",
                }}
              >
                <Typography sx={{ color: "#f1f5f9", fontSize: "0.58rem", fontWeight: 700, mb: 0.375, fontFamily: "'Syne',sans-serif" }}>
                  Recent Projects
                </Typography>
                {PROJECT_NAMES.map((name, i) => (
                  <Box
                    key={i}
                    sx={{
                      px:            0.875,
                      py:            0.625,
                      bgcolor:       "rgba(255,255,255,0.02)",
                      border:        "1px solid rgba(255,255,255,0.04)",
                      borderRadius:  "6px",
                      display:       "flex",
                      alignItems:    "center",
                      gap:           0.75,
                    }}
                  >
                    <Box
                      sx={{
                        width:       6,
                        height:      6,
                        borderRadius:"50%",
                        bgcolor:     DOT_COLORS[i],
                        boxShadow:   `0 0 5px ${DOT_COLORS[i]}`,
                        flexShrink:  0,
                      }}
                    />
                    <Typography sx={{ color: "#94a3b8", fontSize: "0.52rem", fontFamily: "'DM Sans',sans-serif", noWrap: true }}>
                      {name}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Skills cloud */}
              <Box
                sx={{
                  bgcolor:       "rgba(255,255,255,0.02)",
                  border:        "1px solid rgba(255,255,255,0.055)",
                  borderRadius:  "10px",
                  p:             "10px 11px",
                  display:       "flex",
                  flexDirection: "column",
                  gap:           0.625,
                }}
              >
                <Typography sx={{ color: "#f1f5f9", fontSize: "0.58rem", fontWeight: 700, mb: 0.375, fontFamily: "'Syne',sans-serif" }}>
                  Skills
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {SKILL_TAGS.map((s) => (
                    <Box
                      key={s}
                      sx={{
                        px:          0.75,
                        py:          0.25,
                        bgcolor:     "rgba(99,102,241,0.1)",
                        border:      "1px solid rgba(99,102,241,0.22)",
                        borderRadius:"100px",
                      }}
                    >
                      <Typography sx={{ color: "#818cf8", fontSize: "0.48rem", fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>
                        {s}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}