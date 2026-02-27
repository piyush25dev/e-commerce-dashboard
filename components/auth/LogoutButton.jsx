"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconButton, Tooltip, CircularProgress } from "@mui/material";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router  = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {
      // Even if the request fails, push to login —
      // the middleware will catch an invalid/missing cookie anyway.
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tooltip title="Logout" placement="bottom">
      <IconButton
        onClick={handleLogout}
        disabled={loading}
        size="small"
        sx={{
          color: "text.secondary",
          "&:hover": { color: "#ef4444", bgcolor: "rgba(239,68,68,0.08)" },
          transition: "all 0.2s",
        }}
      >
        {loading
          ? <CircularProgress size={16} sx={{ color: "text.secondary" }} />
          : <LogOut size={16} />
        }
      </IconButton>
    </Tooltip>
  );
}