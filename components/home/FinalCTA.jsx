"use client";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useSyncExternalStore } from "react";

export default function FinalCTA() {
  const router = useRouter();
  
  // This ensures we only render on the client
  const isClient = useSyncExternalStore(
    () => () => {}, // subscribe (no-op)
    () => true,     // client snapshot
    () => false     // server snapshot
  );

  if (!isClient) {
    return null;
  }

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 2.5, sm: 4 },
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Card */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 680,
          px: { xs: 3, sm: 7, md: 10 },
          py: { xs: 6, md: 8 },
          textAlign: "center",
          background: "linear-gradient(145deg, rgba(99,102,241,0.07) 0%, rgba(34,211,238,0.04) 100%)",
          border: "1px solid",
          borderColor: alpha("#6366f1", 0.2),
          borderRadius: "28px",
          overflow: "hidden",
        }}
      >
        {/* Top glow */}
        <Box
          sx={{
            position: "absolute",
            top: -70,
            left: "50%",
            transform: "translateX(-50%)",
            width: 340,
            height: 220,
            background: "radial-gradient(ellipse, rgba(99,102,241,0.22) 0%, transparent 70%)",
            filter: "blur(32px)",
            pointerEvents: "none",
          }}
        />

        {/* Bottom-right glow */}
        <Box
          sx={{
            position: "absolute",
            bottom: -40,
            right: -30,
            width: 200,
            height: 200,
            background: "radial-gradient(ellipse, rgba(34,211,238,0.1) 0%, transparent 70%)",
            filter: "blur(36px)",
            pointerEvents: "none",
          }}
        />

        <Typography
          variant="overline"
          sx={{ color: "primary.main", display: "block", mb: 2 }}
        >
          Ready to scale?
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.8rem", sm: "2.25rem", md: "2.6rem" },
            lineHeight: 1.2,
            color: "text.primary",
            mb: 2,
          }}
        >
          Your e-commerce dashboard{" "}
          <Box component="span" className="shimmer-text">
            awaits
          </Box>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            lineHeight: 1.78,
            mb: 4.5,
            fontSize: "0.95rem",
          }}
        >
          Jump straight into the dashboard and start managing your store, inventory,
          orders, and customers in real time.
        </Typography>

        <Stack
          direction="row"
          spacing={1.5}
          justifyContent="center"
          flexWrap="wrap"
          sx={{ gap: 1.5 }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => router.push("/dashboard")}
            sx={{ px: 4, py: 1.5, fontSize: "0.95rem" }}
          >
            🚀 Open Dashboard
          </Button>

          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => router.push("/dashboard/products")}
            sx={{ px: 3.5, py: 1.5, fontSize: "0.95rem" }}
          >
            Manage Products
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}