"use client";
import { useRouter } from "next/navigation";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { NAV_SECTIONS } from "../constants";

// Maps nav item id → route path
const PATH_MAP = {
  overview:   "/dashboard",
  products:   "/dashboard/products",
  about:       "/dashboard/about",
  experience: "/dashboard/experience",
  education:  "/dashboard/education",
  skills:     "/dashboard/skills",
  milestones: "/dashboard/milestones",
  messages:   "/dashboard/messages",
  contact:    "/dashboard/contact",
};

export default function QuickLinks() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const links = NAV_SECTIONS.flatMap((s) => s.items).slice(0, isMobile ? 4 : 6);

  // Adjust grid columns based on screen size
  const getGridColumns = () => {
    if (isMobile) return "repeat(2, 1fr)";
    if (isTablet) return "repeat(3, 1fr)";
    return "repeat(3, 1fr)";
  };

  // Adjust padding based on screen size
  const getContainerPadding = () => {
    if (isMobile) return 2;
    return 2.5;
  };

  return (
    <Box 
      sx={{ 
        bgcolor: "#13131a", 
        border: "1px solid #ffffff08", 
        borderRadius: { xs: 2, sm: 3 }, 
        p: getContainerPadding(),
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Typography 
        variant="body2" 
        fontWeight={700} 
        color="text.primary" 
        mb={{ xs: 1.5, sm: 2 }}
        sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
      >
        Quick Navigation
      </Typography>
      
      <Box 
        sx={{ 
          display: "grid", 
          gridTemplateColumns: getGridColumns(),
          gap: { xs: 0.75, sm: 1 },
          width: "100%",
        }}
      >
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <Box
              key={item.id}
              onClick={() => router.push(PATH_MAP[item.id] || "/dashboard")}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: { xs: 0.5, sm: 0.75 },
                p: { xs: 1, sm: 1.5 },
                borderRadius: { xs: 1.5, sm: 2 },
                cursor: "pointer",
                border: "1px solid #ffffff06",
                transition: "all 0.2s",
                width: "100%",
                minWidth: 0, // Prevents overflow
                "&:hover": {
                  bgcolor: alpha("#6366f1", 0.1),
                  borderColor: alpha("#6366f1", 0.25),
                  transform: { xs: "none", sm: "translateY(-1px)" },
                },
                "&:active": {
                  bgcolor: alpha("#6366f1", 0.15),
                  transform: { xs: "scale(0.98)", sm: "none" },
                },
              }}
            >
              <Box 
                sx={{ 
                  width: { xs: 28, sm: 34 }, 
                  height: { xs: 28, sm: 34 }, 
                  borderRadius: { xs: "8px", sm: "10px" }, 
                  bgcolor: alpha("#6366f1", 0.12), 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={isMobile ? 14 : 16} color="#6366f1" />
              </Box>
              <Typography 
                variant="caption" 
                color="text.secondary" 
                fontWeight={600} 
                textAlign="center"
                sx={{
                  fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                  width: "100%",
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Show indicator for more items on mobile */}
      {isMobile && NAV_SECTIONS.flatMap((s) => s.items).length > 4 && (
        <Box 
          sx={{ 
            mt: 1.5, 
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography variant="caption" color="text.disabled">
            +{NAV_SECTIONS.flatMap((s) => s.items).length - 4} more in menu
          </Typography>
          <Box 
            sx={{ 
              width: 4, 
              height: 4, 
              borderRadius: "50%", 
              bgcolor: "text.disabled",
              opacity: 0.5,
            }} 
          />
        </Box>
      )}
    </Box>
  );
}