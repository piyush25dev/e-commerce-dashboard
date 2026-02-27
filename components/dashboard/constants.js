import {
  LayoutDashboard, FolderKanban, FileText, Briefcase,
  GraduationCap, Mail, Zap, MessageSquare, Eye, Star, BarChart3,
} from "lucide-react";

export const DRAWER_WIDTH = 256;
export const DRAWER_MINI = 72;

export const NAV_SECTIONS = [
  {
    label: "Main",
    items: [
      { id: "overview", label: "Overview", icon: LayoutDashboard, badge: null },
     // { id: "projects", label: "Projects", icon: FolderKanban, badge: "12" },
      { id: "about", label: "About", icon: FolderKanban, badge: "12" },
      { id: "products", label: "Products", icon: Zap, badge: "12" },
    ],
  },
 // {
  //  label: "Portfolio",
  //  items: [
   //   { id: "milestones", label: "Experience", icon: Briefcase, badge: null },
   //   { id: "skills", label: "Skills", icon: Zap, badge: null },
 //     { id: "products", label: "Products", icon: Zap, badge: null },
 //   ],
 // },
  // {
  //   label: "Connect",
  //   items: [
  //     { id: "contact", label: "Contact", icon: Mail, badge: null },
  //   ],
  // },
];

export const STAT_CARDS = [
  { label: "Total Projects", value: "24", icon: FolderKanban, color: "#6366f1", delta: "+3 this month" },
  { label: "Profile Views", value: "14.2k", icon: Eye, color: "#22d3ee", delta: "+18% this week" },
  { label: "GitHub Stars", value: "1,847", icon: Star, color: "#f59e0b", delta: "+124 total" },
  { label: "Blog Posts", value: "18", icon: FileText, color: "#10b981", delta: "+2 published" },
];

export const ACTIVITY = [
  { action: "New project added", detail: "E-Commerce Dashboard", time: "2m ago", icon: FolderKanban, color: "#6366f1" },
  { action: "Blog post published", detail: "Mastering Next.js 14", time: "1h ago", icon: FileText, color: "#22d3ee" },
  { action: "New message received", detail: "From: client@example.com", time: "3h ago", icon: Mail, color: "#f59e0b" },
  { action: "Skills updated", detail: "Added Three.js", time: "1d ago", icon: Zap, color: "#10b981" },
  { action: "Profile view spike", detail: "+340 views today", time: "2d ago", icon: BarChart3, color: "#8b5cf6" },
];