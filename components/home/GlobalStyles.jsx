"use client";
import { GlobalStyles as MuiGlobalStyles } from "@mui/material";

const styles = {
  // Google Fonts
  "@import":
    "url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap')",

  "*, *::before, *::after": { boxSizing: "border-box", margin: 0, padding: 0 },

  body: {
    background: "#060608",
    color: "#f1f5f9",
    fontFamily: "'DM Sans', sans-serif",
    overflowX: "hidden",
  },

  "::selection": {
    background: "rgba(99,102,241,0.32)",
    color: "#f1f5f9",
  },

  "::-webkit-scrollbar":       { width: "4px" },
  "::-webkit-scrollbar-track": { background: "transparent" },
  "::-webkit-scrollbar-thumb": { background: "rgba(255,255,255,0.12)", borderRadius: "8px" },

  /* Shimmer gradient text */
  ".shimmer-text": {
    background:
      "linear-gradient(90deg, #6366f1 0%, #a5b4fc 30%, #22d3ee 50%, #a5b4fc 70%, #6366f1 100%)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "shimmer 4s linear infinite",
  },

  /* Hide nav links on very small screens — no JS needed */
  ".nav-link":                             { display: "block !important" },
  "@media (max-width: 520px)": {
    ".nav-link": { display: "none !important" },
  },

  /* ── Keyframes ── */
  "@keyframes shimmer": {
    "0%":   { backgroundPosition: "-200% center" },
    "100%": { backgroundPosition:  "200% center" },
  },
  "@keyframes fadeUp": {
    from: { opacity: 0, transform: "translateY(28px)" },
    to:   { opacity: 1, transform: "translateY(0)" },
  },
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to:   { opacity: 1 },
  },
  "@keyframes floatA": {
    "0%,100%": { transform: "translate(0,0) scale(1)" },
    "50%":     { transform: "translate(30px,20px) scale(1.05)" },
  },
  "@keyframes floatB": {
    "0%,100%": { transform: "translate(0,0) scale(1)" },
    "50%":     { transform: "translate(-22px,-28px) scale(1.08)" },
  },
  "@keyframes floatC": {
    "0%,100%": { transform: "translate(0,0) scale(1)" },
    "33%":     { transform: "translate(-14px,24px) scale(1.03)" },
    "66%":     { transform: "translate(20px,-12px) scale(0.97)" },
  },
  "@keyframes pulseGlow": {
    "0%,100%": { opacity: 0.8, transform: "scale(1)" },
    "50%":     { opacity: 0.2, transform: "scale(1.2)" },
  },
  "@keyframes scanDot": {
    "0%,100%": { transform: "translateY(0)" },
    "50%":     { transform: "translateY(-4px)" },
  },
};

export default function GlobalStyles() {
  return <MuiGlobalStyles styles={styles} />;
}