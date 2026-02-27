"use client";
import { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Badge,
  Chip,
  useMediaQuery,
  Collapse,
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";

// ── Lucide Icons ──────────────────────────────────────────────────────────────
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Briefcase,
  GraduationCap,
  Mail,
  Settings,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Github,
  Linkedin,
  Twitter,
  Moon,
  Zap,
  User,
  BarChart3,
  Star,
  Eye,
  MessageSquare,
} from "lucide-react";
import ProjectsPage from "./Projects/ProjectsPage";

// ── Theme ─────────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6366f1" },
    secondary: { main: "#22d3ee" },
    background: { default: "#0b0b10", paper: "#13131a" },
    text: { primary: "#f1f5f9", secondary: "#64748b" },
    error: { main: "#ef4444" },
    warning: { main: "#f59e0b" },
    success: { main: "#10b981" },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: "'Syne', 'DM Sans', sans-serif",
    h5: { fontWeight: 800, letterSpacing: "-0.5px" },
    h6: { fontWeight: 700 },
    body2: { fontFamily: "'DM Sans', sans-serif" },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          margin: "2px 8px",
          padding: "8px 12px",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: alpha("#6366f1", 0.1),
          },
          "&.Mui-selected": {
            backgroundColor: alpha("#6366f1", 0.15),
            "&:hover": { backgroundColor: alpha("#6366f1", 0.2) },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: "none",
          backgroundColor: "#0e0e16",
          borderRight: "1px solid #ffffff08",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#0b0b10cc",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #ffffff08",
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", fontWeight: 600 } },
    },
  },
});

// ── Constants ─────────────────────────────────────────────────────────────────
const DRAWER_WIDTH = 256;
const DRAWER_MINI = 72;

const NAV_SECTIONS = [
  {
    label: "Main",
    items: [
      { id: "overview", label: "Overview", icon: LayoutDashboard, badge: null },
      { id: "projects", label: "Projects", icon: FolderKanban, badge: "12" },
      { id: "products", label: "Products", icon: FolderKanban, badge: "0" },
      {
        id: "blog",
        label: "Blog",
        icon: FileText,
        badge: "3",
        badgeColor: "secondary",
      },
    ],
  },
  {
    label: "Portfolio",
    items: [
      { id: "experience", label: "Experience", icon: Briefcase, badge: null },
      { id: "education", label: "Education", icon: GraduationCap, badge: null },
      { id: "skills", label: "Skills", icon: Zap, badge: null },
    ],
  },
  {
    label: "Connect",
    items: [
      {
        id: "messages",
        label: "Messages",
        icon: MessageSquare,
        badge: "5",
        badgeColor: "error",
      },
      { id: "contact", label: "Contact", icon: Mail, badge: null },
    ],
  },
];

const STAT_CARDS = [
  {
    label: "Total Projects",
    value: "24",
    icon: FolderKanban,
    color: "#6366f1",
    delta: "+3 this month",
  },
  {
    label: "Profile Views",
    value: "14.2k",
    icon: Eye,
    color: "#22d3ee",
    delta: "+18% this week",
  },
  {
    label: "GitHub Stars",
    value: "1,847",
    icon: Star,
    color: "#f59e0b",
    delta: "+124 total",
  },
  {
    label: "Blog Posts",
    value: "18",
    icon: FileText,
    color: "#10b981",
    delta: "+2 published",
  },
];

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({
  collapsed,
  onToggle,
  activeId,
  onSelect,
  isMobile,
  mobileOpen,
  onMobileClose,
}) {
  const width = collapsed ? DRAWER_MINI : DRAWER_WIDTH;

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Logo / Brand */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          px: 2,
          gap: 1.5,
          flexShrink: 0,
          borderBottom: "1px solid #ffffff08",
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 0 20px #6366f140",
          }}
        >
          <Sparkles size={18} color="#fff" />
        </Box>
        {!collapsed && (
          <Box sx={{ overflow: "hidden" }}>
            <Typography
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "1rem",
                color: "#f1f5f9",
                lineHeight: 1.2,
                whiteSpace: "nowrap",
              }}
            >
              Portfolio
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              Admin Dashboard
            </Typography>
          </Box>
        )}
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden", py: 1.5 }}>
        {NAV_SECTIONS.map((section) => (
          <Box key={section.label} mb={0.5}>
            {!collapsed && (
              <Typography
                variant="caption"
                sx={{
                  color: "#334155",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  px: 2.5,
                  display: "block",
                  mb: 0.5,
                  mt: 1.5,
                  fontSize: "0.65rem",
                }}
              >
                {section.label}
              </Typography>
            )}
            {collapsed && <Divider sx={{ borderColor: "#ffffff08", my: 1 }} />}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;
              return (
                <Tooltip
                  key={item.id}
                  title={collapsed ? item.label : ""}
                  placement="right"
                  arrow
                >
                  <ListItemButton
                    selected={isActive}
                    onClick={() => {
                      onSelect(item.id);
                      if (isMobile) onMobileClose();
                    }}
                    sx={{
                      mx: collapsed ? "8px" : "8px",
                      justifyContent: collapsed ? "center" : "flex-start",
                      px: collapsed ? 0 : "12px",
                      minHeight: 42,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: collapsed ? 0 : 36,
                        color: isActive ? "primary.main" : "text.secondary",
                        transition: "color 0.2s",
                        justifyContent: "center",
                      }}
                    >
                      {item.badge ? (
                        <Badge
                          badgeContent={item.badge}
                          color={item.badgeColor || "primary"}
                          sx={{
                            "& .MuiBadge-badge": {
                              fontSize: "0.6rem",
                              height: 16,
                              minWidth: 16,
                            },
                          }}
                        >
                          <Icon size={18} />
                        </Badge>
                      ) : (
                        <Icon size={18} />
                      )}
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: "0.875rem",
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? "text.primary" : "text.secondary",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      />
                    )}
                    {!collapsed && isActive && (
                      <Box
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          boxShadow: "0 0 6px #6366f1",
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              );
            })}
          </Box>
        ))}
      </Box>

      {/* Profile + Settings */}
      <Box sx={{ borderTop: "1px solid #ffffff08", p: 1.5, flexShrink: 0 }}>
        {!collapsed ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 1.5,
              borderRadius: 2,
              cursor: "pointer",
              "&:hover": { bgcolor: alpha("#6366f1", 0.07) },
              transition: "background 0.2s",
            }}
          >
            <Avatar
              sx={{
                width: 34,
                height: 34,
                background: "linear-gradient(135deg, #6366f1, #22d3ee)",
                fontSize: "0.9rem",
                fontWeight: 700,
              }}
            >
              JD
            </Avatar>
            <Box flex={1} overflow="hidden">
              <Typography
                variant="body2"
                fontWeight={700}
                noWrap
                color="text.primary"
              >
                Piyush Kumar Dewangan
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                Full-Stack Developer
              </Typography>
            </Box>
            <Settings size={14} color="#64748b" />
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title="Profile" placement="right">
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  background: "linear-gradient(135deg, #6366f1, #22d3ee)",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                JD
              </Avatar>
            </Tooltip>
          </Box>
        )}
      </Box>

      {/* Collapse toggle — desktop only */}
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: collapsed ? "center" : "flex-end",
            px: 1.5,
            pb: 1.5,
          }}
        >
          <Tooltip title={collapsed ? "Expand" : "Collapse"} placement="right">
            <IconButton
              onClick={onToggle}
              size="small"
              sx={{
                bgcolor: "#1e1e2a",
                border: "1px solid #ffffff10",
                color: "text.secondary",
                "&:hover": { bgcolor: "#26263a", color: "text.primary" },
              }}
            >
              {collapsed ? (
                <ChevronRight size={16} />
              ) : (
                <ChevronLeft size={16} />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": { width: DRAWER_WIDTH } }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: width,
        flexShrink: 0,
        transition: "width 0.25s ease",
        "& .MuiDrawer-paper": {
          width: width,
          transition: "width 0.25s ease",
          overflowX: "hidden",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}

// ── TopBar ────────────────────────────────────────────────────────────────────
function TopBar({ onMenuToggle, activeId }) {
  const label =
    NAV_SECTIONS.flatMap((s) => s.items).find((i) => i.id === activeId)
      ?.label || "Dashboard";
  return (
    <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
      <Toolbar sx={{ gap: 2, minHeight: "64px !important" }}>
        <IconButton
          onClick={onMenuToggle}
          edge="start"
          sx={{ color: "text.secondary", display: { md: "none" } }}
        >
          <LayoutDashboard size={20} />
        </IconButton>

        {/* Page title */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "1rem",
            }}
          >
            {label}
          </Typography>
        </Box>

        {/* Right actions */}
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Tooltip title="Search">
            <IconButton sx={{ color: "text.secondary" }}>
              <Search size={18} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton sx={{ color: "text.secondary" }}>
              <Badge
                badgeContent={3}
                color="error"
                sx={{ "& .MuiBadge-badge": { fontSize: "0.6rem" } }}
              >
                <Bell size={18} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "#ffffff10", mx: 0.5 }}
          />

          <Stack direction="row" spacing={0.5}>
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <Tooltip key={i} title={["GitHub", "LinkedIn", "Twitter"][i]}>
                <IconButton
                  size="small"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  <Icon size={16} />
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, color, delta }) {
  return (
    <Box
      sx={{
        bgcolor: "#13131a",
        border: "1px solid #ffffff08",
        borderRadius: 3,
        p: 2.5,
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "all 0.2s",
        "&:hover": {
          borderColor: alpha(color, 0.3),
          transform: "translateY(-2px)",
          boxShadow: `0 8px 32px ${alpha(color, 0.1)}`,
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${color}, transparent)`,
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={600}
            sx={{
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: "0.65rem",
            }}
          >
            {label}
          </Typography>
          <Typography
            variant="h4"
            fontWeight={800}
            color="text.primary"
            sx={{ fontFamily: "'Syne', sans-serif", mt: 0.5, lineHeight: 1 }}
          >
            {value}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: alpha(color, 0.9),
              fontWeight: 600,
              mt: 0.75,
              display: "block",
            }}
          >
            {delta}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            bgcolor: alpha(color, 0.1),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px solid ${alpha(color, 0.2)}`,
          }}
        >
          <Icon size={20} color={color} />
        </Box>
      </Stack>

      {/* Decorative glow blob */}
      <Box
        sx={{
          position: "absolute",
          bottom: -20,
          right: -10,
          width: 80,
          height: 80,
          borderRadius: "50%",
          bgcolor: alpha(color, 0.05),
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}

// ── Quick Links ───────────────────────────────────────────────────────────────
function QuickLinks({ onSelect }) {
  const links = NAV_SECTIONS.flatMap((s) => s.items).slice(0, 6);
  return (
    <Box
      sx={{
        bgcolor: "#13131a",
        border: "1px solid #ffffff08",
        borderRadius: 3,
        p: 2.5,
      }}
    >
      <Typography variant="body2" fontWeight={700} color="text.primary" mb={2}>
        Quick Navigation
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
        }}
      >
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <Box
              key={item.id}
              onClick={() => onSelect(item.id)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.75,
                p: 1.5,
                borderRadius: 2,
                cursor: "pointer",
                border: "1px solid #ffffff06",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: alpha("#6366f1", 0.1),
                  borderColor: alpha("#6366f1", 0.25),
                  transform: "translateY(-1px)",
                },
              }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "10px",
                  bgcolor: alpha("#6366f1", 0.12),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={16} color="#6366f1" />
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
                textAlign="center"
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

// ── Recent Activity ───────────────────────────────────────────────────────────
const ACTIVITY = [
  {
    action: "New project added",
    detail: "E-Commerce Dashboard",
    time: "2m ago",
    icon: FolderKanban,
    color: "#6366f1",
  },
  {
    action: "Blog post published",
    detail: "Mastering Next.js 14",
    time: "1h ago",
    icon: FileText,
    color: "#22d3ee",
  },
  {
    action: "New message received",
    detail: "From: client@example.com",
    time: "3h ago",
    icon: Mail,
    color: "#f59e0b",
  },
  {
    action: "Skills updated",
    detail: "Added Three.js",
    time: "1d ago",
    icon: Zap,
    color: "#10b981",
  },
  {
    action: "Profile view spike",
    detail: "+340 views today",
    time: "2d ago",
    icon: BarChart3,
    color: "#8b5cf6",
  },
];

function RecentActivity() {
  return (
    <Box
      sx={{
        bgcolor: "#13131a",
        border: "1px solid #ffffff08",
        borderRadius: 3,
        p: 2.5,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="body2" fontWeight={700} color="text.primary">
          Recent Activity
        </Typography>
        <Chip
          label="Live"
          size="small"
          sx={{
            bgcolor: alpha("#10b981", 0.12),
            color: "#10b981",
            fontSize: "0.65rem",
            height: 20,
            "& .MuiChip-label": { px: 1 },
          }}
        />
      </Stack>
      <Stack spacing={0}>
        {ACTIVITY.map((a, i) => {
          const Icon = a.icon;
          return (
            <Box key={i}>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="flex-start"
                py={1.25}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "9px",
                    bgcolor: alpha(a.color, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    mt: 0.25,
                  }}
                >
                  <Icon size={14} color={a.color} />
                </Box>
                <Box flex={1}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="text.primary"
                    fontSize="0.8rem"
                  >
                    {a.action}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {a.detail}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  flexShrink={0}
                  fontSize="0.7rem"
                >
                  {a.time}
                </Typography>
              </Stack>
              {i < ACTIVITY.length - 1 && (
                <Divider sx={{ borderColor: "#ffffff06" }} />
              )}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}

// ── Overview Content (placeholder for other pages) ────────────────────────────
function OverviewPage({ onSelect }) {
  return (
    <Box>
      {/* Welcome banner */}
      <Box
        sx={{
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          mb: 3,
          p: { xs: 3, md: 4 },
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16162a 50%, #0f0f1a 100%)",
          border: "1px solid #ffffff08",
        }}
      >
        {/* Glow blobs */}
        <Box
          sx={{
            position: "absolute",
            top: -40,
            right: 60,
            width: 200,
            height: 200,
            borderRadius: "50%",
            bgcolor: alpha("#6366f1", 0.08),
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -20,
            right: -20,
            width: 150,
            height: 150,
            borderRadius: "50%",
            bgcolor: alpha("#22d3ee", 0.05),
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ sm: "center" }}
          spacing={2}
          sx={{ position: "relative" }}
        >
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
              <Moon size={14} color="#94a3b8" />
              <Typography variant="caption" color="text.secondary">
                Good evening
              </Typography>
            </Stack>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                color: "text.primary",
                lineHeight: 1.2,
                mb: 0.75,
              }}
            >
              Welcome back,{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Piyush
              </Box>{" "}
              👋
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your portfolio is looking great. Here&apso;s what&apos;s happening
              today.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Box
              onClick={() => onSelect("projects")}
              sx={{
                px: 2.5,
                py: 1.25,
                bgcolor: "primary.main",
                borderRadius: 2,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#fff",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "#4f46e5",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <FolderKanban size={15} />
              Manage Projects
            </Box>
          </Stack>
        </Stack>
      </Box>

      {/* Stat Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
          gap: 2,
          mb: 3,
        }}
      >
        {STAT_CARDS.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </Box>

      {/* Bottom grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        <RecentActivity />
        <QuickLinks onSelect={onSelect} />
      </Box>
    </Box>
  );
}

// ── Placeholder Page ──────────────────────────────────────────────────────────
function PlaceholderPage({ id }) {
  const item = NAV_SECTIONS.flatMap((s) => s.items).find((i) => i.id === id);
  const Icon = item?.icon || User;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 400,
        gap: 2,
        opacity: 0.6,
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: 3,
          bgcolor: alpha("#6366f1", 0.1),
          border: "1px solid",
          borderColor: alpha("#6366f1", 0.2),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={32} color="#6366f1" />
      </Box>
      <Typography variant="h6" fontWeight={700} color="text.secondary">
        {item?.label} Page
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Plug in your {item?.label?.toLowerCase()} component here.
      </Typography>
    </Box>
  );
}

// ── Dashboard Layout (Main) ───────────────────────────────────────────────────
export default function DashboardLayout() {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("overview");

  const sidebarWidth = isMobile ? 0 : collapsed ? DRAWER_MINI : DRAWER_WIDTH;

  return (
    <ThemeProvider theme={theme}>
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ffffff15; border-radius: 8px; }
      `}</style>

      <Box
        sx={{
          display: "flex",
          bgcolor: "background.default",
          minHeight: "100vh",
        }}
      >
        {/* Sidebar */}
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          activeId={activeId}
          onSelect={setActiveId}
          isMobile={isMobile}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        {/* Main area */}
        <Box
          component="main"
          sx={{
            flex: 1,
            ml: 0,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Top AppBar */}
          <TopBar
            onMenuToggle={() => setMobileOpen(true)}
            activeId={activeId}
          />

          {/* Page Content */}
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
            {activeId === "overview" ? (
              <OverviewPage onSelect={setActiveId} />
            ) : activeId === "projects" ? (
              <ProjectsPage />
            ) : (
              <PlaceholderPage id={activeId} />
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
