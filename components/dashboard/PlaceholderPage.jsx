import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { User } from "lucide-react";
import { NAV_SECTIONS } from "./constants";

export default function PlaceholderPage({ id }) {
  const item = NAV_SECTIONS.flatMap((s) => s.items).find((i) => i.id === id);
  const Icon = item?.icon || User;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, gap: 2, opacity: 0.6 }}>
      <Box sx={{ width: 72, height: 72, borderRadius: 3, bgcolor: alpha("#6366f1", 0.1), border: "1px solid", borderColor: alpha("#6366f1", 0.2), display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={32} color="#6366f1" />
      </Box>
      <Typography variant="h6" fontWeight={700} color="text.secondary">{item?.label} Page</Typography>
      <Typography variant="body2" color="text.secondary">Plug in your {item?.label?.toLowerCase()} component here.</Typography>
    </Box>
  );
}