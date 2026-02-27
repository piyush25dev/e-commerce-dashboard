"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Box, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/components/dashboard/theme";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { useDashboardCounts } from "@/components/dashboard/Usedashboardcounts";

export default function DashboardLayout({ children }) {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const { counts, loading: countsLoading } = useDashboardCounts();

  const segment = pathname.split("/")[2];
  const activeId = segment || "overview";

  return (
    <ThemeProvider theme={theme}>
      {/* @import removed — fonts are loaded by the parent layout.jsx via next/font */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ffffff15; border-radius: 8px; }
      `}</style>

      <Box sx={{ display: "flex", bgcolor: "background.default", minHeight: "100vh" }}>
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          activeId={activeId}
          isMobile={isMobile}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
          counts={counts}
          countsLoading={countsLoading}
        />

        <Box component="main" sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <TopBar
            onMenuToggle={() => setMobileOpen(true)}
            activeId={activeId}
          />
          <Box
            sx={{
              flex: 1,
              mt: "64px",
              p: { xs: 2, sm: 3, md: 4 },
              maxWidth: 1400,
              width: "100%",
              mx: "auto",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}