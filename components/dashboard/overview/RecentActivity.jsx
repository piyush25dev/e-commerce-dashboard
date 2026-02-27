import { Box, Stack, Typography, Chip, Divider } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { ACTIVITY } from "../constants";

export default function RecentActivity() {
  return (
    <Box sx={{ bgcolor: "#13131a", border: "1px solid #ffffff08", borderRadius: 3, p: 2.5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="body2" fontWeight={700} color="text.primary">Recent Activity</Typography>
        <Chip label="Live" size="small" sx={{ bgcolor: alpha("#10b981", 0.12), color: "#10b981", fontSize: "0.65rem", height: 20, "& .MuiChip-label": { px: 1 } }} />
      </Stack>
      <Stack spacing={0}>
        {ACTIVITY.map((a, i) => {
          const Icon = a.icon;
          return (
            <Box key={i}>
              <Stack direction="row" spacing={1.5} alignItems="flex-start" py={1.25}>
                <Box sx={{ width: 32, height: 32, borderRadius: "9px", bgcolor: alpha(a.color, 0.1), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, mt: 0.25 }}>
                  <Icon size={14} color={a.color} />
                </Box>
                <Box flex={1}>
                  <Typography variant="body2" fontWeight={600} color="text.primary" fontSize="0.8rem">{a.action}</Typography>
                  <Typography variant="caption" color="text.secondary">{a.detail}</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" flexShrink={0} fontSize="0.7rem">{a.time}</Typography>
              </Stack>
              {i < ACTIVITY.length - 1 && <Divider sx={{ borderColor: "#ffffff06" }} />}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}