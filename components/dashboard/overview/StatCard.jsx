import { Box, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function StatCard({ label, value, icon: Icon, color, delta }) {
  return (
    <Box sx={{ bgcolor: "#13131a", border: "1px solid #ffffff08", borderRadius: 3, p: 2.5, position: "relative", overflow: "hidden", cursor: "default", transition: "all 0.2s",
      "&:hover": { borderColor: alpha(color, 0.3), transform: "translateY(-2px)", boxShadow: `0 8px 32px ${alpha(color, 0.1)}` },
      "&::before": { content: '""', position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color}, transparent)` },
    }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.65rem" }}>
            {label}
          </Typography>
          <Typography variant="h4" fontWeight={800} color="text.primary" sx={{ fontFamily: "'Syne', sans-serif", mt: 0.5, lineHeight: 1 }}>
            {value}
          </Typography>
          <Typography variant="caption" sx={{ color: alpha(color, 0.9), fontWeight: 600, mt: 0.75, display: "block" }}>
            {delta}
          </Typography>
        </Box>
        <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: alpha(color, 0.1), display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${alpha(color, 0.2)}` }}>
          <Icon size={20} color={color} />
        </Box>
      </Stack>
      <Box sx={{ position: "absolute", bottom: -20, right: -10, width: 80, height: 80, borderRadius: "50%", bgcolor: alpha(color, 0.05), filter: "blur(20px)", pointerEvents: "none" }} />
    </Box>
  );
}