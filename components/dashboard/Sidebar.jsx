"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Box, Drawer, Typography, Avatar, Stack, Divider,
  ListItemButton, ListItemIcon, ListItemText,
  Tooltip, Badge, IconButton, CircularProgress,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Sparkles, ChevronLeft, ChevronRight, Settings, LogOut } from "lucide-react";
import { NAV_SECTIONS, DRAWER_WIDTH, DRAWER_MINI } from "./constants";

// Maps nav item id → Firestore count key
const COUNT_KEY_MAP = {
 // projects:   "projects",
 // skills:     "skills",
 // milestones: "milestones",
  about: "about",
 // blog:       "blog",
 // messages:   "messages",
  products:   "products",
};

// Maps nav item id → URL path
const PATH_MAP = {
  overview:   "/dashboard",
//  projects:   "/dashboard/projects",
//  blog:       "/dashboard/blog",
//  experience: "/dashboard/experience",
 // education:  "/dashboard/education",
 // skills:     "/dashboard/skills",
//  milestones: "/dashboard/milestones",
  about: "/dashboard/about",
 // messages:   "/dashboard/messages",
 // contact:    "/dashboard/contact",
  products:    "/dashboard/products",
};

// ── Sidebar logout button ─────────────────────────────────────────────────────
function SidebarLogoutButton({ collapsed }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  if (collapsed) {
    return (
      <Tooltip title="Logout" placement="right" arrow>
        <IconButton
          onClick={handleLogout}
          disabled={loading}
          size="small"
          sx={{
            width: 34, height: 34,
            bgcolor: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.12)",
            color: "#ef444488",
            borderRadius: "8px",
            "&:hover": {
              bgcolor: "rgba(239,68,68,0.14)",
              color: "#ef4444",
              borderColor: "rgba(239,68,68,0.3)",
            },
            transition: "all 0.2s",
          }}
        >
          {loading
            ? <CircularProgress size={14} sx={{ color: "#ef4444" }} />
            : <LogOut size={15} />
          }
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Box
      onClick={!loading ? handleLogout : undefined}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 1.5,
        py: 1,
        borderRadius: "10px",
        cursor: loading ? "not-allowed" : "pointer",
        border: "1px solid rgba(239,68,68,0.1)",
        bgcolor: "rgba(239,68,68,0.04)",
        transition: "all 0.2s",
        "&:hover": {
          bgcolor: "rgba(239,68,68,0.1)",
          borderColor: "rgba(239,68,68,0.25)",
        },
      }}
    >
      <Box sx={{ width: 28, height: 28, borderRadius: "8px", bgcolor: "rgba(239,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {loading
          ? <CircularProgress size={14} sx={{ color: "#ef4444" }} />
          : <LogOut size={14} color="#ef4444" />
        }
      </Box>
      <Typography variant="body2" sx={{ color: "#ef444499", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", flex: 1 }}>
        {loading ? "Signing out…" : "Sign Out"}
      </Typography>
    </Box>
  );
}

export default function Sidebar({
  collapsed, onToggle, activeId,
  isMobile, mobileOpen, onMobileClose,
  counts = {}, countsLoading = false,
}) {
  const width = collapsed ? DRAWER_MINI : DRAWER_WIDTH;

  const getBadge = (item) => {
    const key = COUNT_KEY_MAP[item.id];
    if (!key) return null;
    if (countsLoading) return "…";
    const val = counts[key];
    if (val === undefined || val === null) return null;
    return String(val);
  };

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Brand */}
      <Box sx={{ height: 64, display: "flex", alignItems: "center", px: 2, gap: 1.5, flexShrink: 0, borderBottom: "1px solid #ffffff08" }}>
        <Box sx={{ width: 36, height: 36, borderRadius: "10px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 20px #6366f140" }}>
          <Sparkles size={18} color="#fff" />
        </Box>
        {!collapsed && (
          <Box sx={{ overflow: "hidden" }}>
            <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1rem", color: "#f1f5f9", lineHeight: 1.2, whiteSpace: "nowrap" }}>
              Portfolio
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>Admin Dashboard</Typography>
          </Box>
        )}
      </Box>

      {/* Nav */}
      <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden", py: 1.5 }}>
        {NAV_SECTIONS.map((section) => (
          <Box key={section.label} mb={0.5}>
            {!collapsed ? (
              <Typography variant="caption" sx={{ color: "#334155", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", px: 2.5, display: "block", mb: 0.5, mt: 1.5, fontSize: "0.65rem" }}>
                {section.label}
              </Typography>
            ) : (
              <Divider sx={{ borderColor: "#ffffff08", my: 1 }} />
            )}

            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;
              const badgeValue = getBadge(item);
              const href = PATH_MAP[item.id] || "/dashboard";

              return (
                <Tooltip key={item.id} title={collapsed ? item.label : ""} placement="right" arrow>
                  <Link
                    href={href}
                    style={{ textDecoration: "none", display: "block" }}
                    onClick={isMobile ? onMobileClose : undefined}
                  >
                    <ListItemButton
                      selected={isActive}
                      sx={{
                        justifyContent: collapsed ? "center" : "flex-start",
                        px: collapsed ? 0 : "12px",
                        minHeight: 42,
                        mx: "8px",
                        borderRadius: "10px",
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: collapsed ? 0 : 36, color: isActive ? "primary.main" : "text.secondary", justifyContent: "center" }}>
                        {badgeValue ? (
                          <Badge
                            badgeContent={badgeValue}
                            color={item.badgeColor || "primary"}
                            sx={{ "& .MuiBadge-badge": { fontSize: "0.6rem", height: 16, minWidth: 16 } }}
                          >
                            <Icon size={18} />
                          </Badge>
                        ) : (
                          <Icon size={18} />
                        )}
                      </ListItemIcon>

                      {!collapsed && (
                        <>
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                              fontSize: "0.875rem",
                              fontWeight: isActive ? 700 : 500,
                              color: isActive ? "text.primary" : "text.secondary",
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                          />
                          {badgeValue && badgeValue !== "…" && (
                            <Box
                              sx={{
                                px: 0.75,
                                py: 0.1,
                                borderRadius: 1,
                                bgcolor: isActive ? alpha("#6366f1", 0.2) : "#ffffff0a",
                                border: "1px solid",
                                borderColor: isActive ? alpha("#6366f1", 0.35) : "#ffffff10",
                                minWidth: 22,
                                textAlign: "center",
                              }}
                            >
                              <Typography variant="caption" sx={{ fontSize: "0.65rem", fontWeight: 700, color: isActive ? "primary.main" : "text.secondary", lineHeight: 1.4 }}>
                                {badgeValue}
                              </Typography>
                            </Box>
                          )}
                          {!badgeValue && isActive && (
                            <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "primary.main", boxShadow: "0 0 6px #6366f1" }} />
                          )}
                        </>
                      )}
                    </ListItemButton>
                  </Link>
                </Tooltip>
              );
            })}
          </Box>
        ))}
      </Box>

      {/* Profile + Logout */}
      <Box sx={{ borderTop: "1px solid #ffffff08", p: 1.5, flexShrink: 0 }}>
        {!collapsed ? (
          <Box>
            {/* Profile row */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5, borderRadius: 2, mb: 0.5 }}>
              <Avatar sx={{ width: 34, height: 34, background: "linear-gradient(135deg, #6366f1, #22d3ee)", fontSize: "0.9rem", fontWeight: 700, flexShrink: 0 }}>JD</Avatar>
              <Box flex={1} overflow="hidden">
                <Typography variant="body2" fontWeight={700} noWrap color="text.primary">Piyush Kumar Dewangan</Typography>
                <Typography variant="caption" color="text.secondary" noWrap>Full-Stack Developer</Typography>
              </Box>
              <Settings size={14} color="#64748b" />
            </Box>
            {/* Logout button — expanded */}
            <SidebarLogoutButton collapsed={false} />
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <Tooltip title="Profile" placement="right">
              <Avatar sx={{ width: 34, height: 34, background: "linear-gradient(135deg, #6366f1, #22d3ee)", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer" }}>JD</Avatar>
            </Tooltip>
            {/* Logout button — collapsed */}
            <SidebarLogoutButton collapsed={true} />
          </Box>
        )}
      </Box>

      {/* Collapse toggle */}
      {!isMobile && (
        <Box sx={{ display: "flex", justifyContent: collapsed ? "center" : "flex-end", px: 1.5, pb: 1.5 }}>
          <Tooltip title={collapsed ? "Expand" : "Collapse"} placement="right">
            <IconButton onClick={onToggle} size="small" sx={{ bgcolor: "#1e1e2a", border: "1px solid #ffffff10", color: "text.secondary", "&:hover": { bgcolor: "#26263a", color: "text.primary" } }}>
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer variant="temporary" open={mobileOpen} onClose={onMobileClose} ModalProps={{ keepMounted: true }} sx={{ "& .MuiDrawer-paper": { width: DRAWER_WIDTH } }}>
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer variant="permanent" sx={{ width, flexShrink: 0, transition: "width 0.25s ease", "& .MuiDrawer-paper": { width, transition: "width 0.25s ease", overflowX: "hidden" } }}>
      {drawerContent}
    </Drawer>
  );
}