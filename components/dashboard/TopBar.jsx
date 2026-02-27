"use client";
import {
  AppBar, Toolbar, Typography, IconButton, Stack,
  Divider, Badge, Tooltip, Box,
} from "@mui/material";
import { LayoutDashboard, Search, Bell, Github, Linkedin, Twitter } from "lucide-react";
import { NAV_SECTIONS } from "./constants";
import LogoutButton from "../auth/LogoutButton";

export default function TopBar({ onMenuToggle, activeId }) {
  const label =
    NAV_SECTIONS.flatMap((s) => s.items).find((i) => i.id === activeId)?.label ||
    "Dashboard";

  return (
    <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
      <Toolbar
        sx={{
          minHeight: "64px !important",
          px: { xs: 1.5, sm: 2 },
          gap: 0,
        }}
      >
        {/* Mobile hamburger */}
        <IconButton
          onClick={onMenuToggle}
          edge="start"
          sx={{ color: "text.secondary", display: { md: "none" }, mr: 0.5 }}
        >
          <LayoutDashboard size={20} />
        </IconButton>

        {/* Page title */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            {label}
          </Typography>
        </Box>

        {/* Right actions */}
        <Stack direction="row" alignItems="center" flexShrink={0}>
          <Tooltip title="Search">
            <IconButton size="small" sx={{ color: "text.secondary" }}>
              <Search size={18} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton size="small" sx={{ color: "text.secondary" }}>
              <Badge
                badgeContent={3}
                color="error"
                sx={{ "& .MuiBadge-badge": { fontSize: "0.6rem" } }}
              >
                <Bell size={18} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Social icons — hidden on mobile */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: "#ffffff10", mx: 0.75, height: 20, alignSelf: "center" }}
            />
            <Stack direction="row">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <Tooltip key={i} title={["GitHub", "LinkedIn", "Twitter"][i]}>
                  <IconButton
                    size="small"
                    sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
                  >
                    <Icon size={16} />
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Box>

          {/* Divider + Logout */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "#ffffff10", mx: 0.75, height: 20, alignSelf: "center" }}
          />
          <LogoutButton />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}