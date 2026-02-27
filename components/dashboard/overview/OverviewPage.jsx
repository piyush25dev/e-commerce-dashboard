// app/dashboard/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Stack, Typography, Skeleton } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Moon, Package } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import QuickLinks from "./QuickLinks";

// ─── Product mini card ────────────────────────────────────────────────────────
function ProductMiniCard({ product, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        p: 1.75,
        borderRadius: 2,
        border: "1px solid #ffffff08",
        bgcolor: "#0f0f16",
        cursor: "pointer",
        transition: "all 0.2s",
        minWidth: 0,
        overflow: "hidden",
        "&:hover": {
          borderColor: alpha("#6366f1", 0.3),
          transform: "translateY(-1px)",
        },
      }}
    >
      <Typography
        variant="body2"
        fontWeight={700}
        color="text.primary"
        noWrap
        mb={0.5}
      >
        {product.name}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          display: "block",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          mb: 1,
        }}
      >
        {product.description}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          variant="caption"
          sx={{
            px: 0.75,
            py: 0.25,
            borderRadius: 1,
            bgcolor: alpha("#6366f1", 0.1),
            border: `1px solid ${alpha("#6366f1", 0.2)}`,
            color: "#6366f1",
            fontWeight: 600,
            fontSize: "0.62rem",
          }}
        >
          {product.category || "Product"}
        </Typography>
        {product.price && (
          <Typography
            variant="caption"
            fontWeight={700}
            color="#E8D5C4"
            sx={{ fontSize: "0.7rem" }}
          >
            ${product.price}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────
function SectionCard({
  title,
  icon: Icon,
  color = "#6366f1",
  onViewAll,
  children,
  loading,
}) {
  return (
    <Box
      sx={{
        bgcolor: "#13131a",
        border: "1px solid #ffffff08",
        borderRadius: 3,
        p: { xs: 2, sm: 2.5 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
        flexWrap="nowrap"
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ minWidth: 0 }}
        >
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "8px",
              bgcolor: alpha(color, 0.12),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={14} color={color} />
          </Box>
          <Typography
            variant="body2"
            fontWeight={700}
            color="text.primary"
            noWrap
          >
            {title}
          </Typography>
        </Stack>
        {onViewAll && (
          <Typography
            variant="caption"
            onClick={onViewAll}
            sx={{
              color: "primary.main",
              cursor: "pointer",
              fontWeight: 600,
              flexShrink: 0,
              whiteSpace: "nowrap",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            View all →
          </Typography>
        )}
      </Stack>

      {loading ? (
        <Stack spacing={1}>
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              variant="rounded"
              height={24}
              sx={{ bgcolor: "#ffffff08" }}
            />
          ))}
        </Stack>
      ) : (
        children
      )}
    </Box>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function OverviewPage() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [aboutContent, setAboutContent] = useState(null);
  const [team, setTeam] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const [prodSnap, contentSnap, teamSnap] = await Promise.all([
          getDocs(collection(db, "products")),
          getDocs(collection(db, "aboutContent")),
          getDocs(collection(db, "aboutTeam")),
        ]);

        setProducts(
          prodSnap.docs.map((d) => ({ id: d.id, ...d.data() })).slice(0, 4),
        );

        setTeam(
          teamSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
        );

        if (contentSnap.docs.length > 0) {
          setAboutContent(contentSnap.docs[0].data());
        }
      } catch (e) {
        console.error("Error fetching data:", e);
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      {/* ── Welcome Banner ── */}
      <Box
        sx={{
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          mb: 3,
          p: { xs: 2.5, sm: 3, md: 4 },
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
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ position: "relative" }}
        >
          <Box sx={{ minWidth: 0 }}>
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
                fontSize: { xs: "1.5rem", sm: "1.85rem", md: "2.125rem" },
              }}
            >
              Welcome back,{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Piyush
              </Box>{" "}
              👋
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your portfolio is looking great. Here&apos;s what&apos;s happening
              today.
            </Typography>
          </Box>

          <Box
            onClick={() => router.push("/dashboard/products")}
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
              flexShrink: 0,
              whiteSpace: "nowrap",
              alignSelf: { xs: "flex-start", sm: "auto" },
              "&:hover": { bgcolor: "#4f46e5", transform: "translateY(-1px)" },
            }}
          >
            <Package size={15} /> Manage Products
          </Box>
        </Stack>
      </Box>

      {/* ── Products + About ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
          minWidth: 0,
        }}
      >
        {/* Products Section */}
        <SectionCard
          title="Featured Products"
          icon={Package}
          color="#6366f1"
          onViewAll={() => router.push("/dashboard/products")}
          loading={dataLoading}
        >
          {products.length === 0 ? (
            <Typography variant="caption" color="text.secondary">
              No products yet.
            </Typography>
          ) : (
            <Stack spacing={1}>
              {products.map((p) => (
                <ProductMiniCard
                  key={p.id}
                  product={p}
                  onClick={() => router.push("/dashboard/products")}
                />
              ))}
            </Stack>
          )}
        </SectionCard>

        {/* About Section */}
        <Box
          sx={{
            bgcolor: "#13131a",
            border: "1px solid #ffffff08",
            borderRadius: 3,
            p: { xs: 2, sm: 2.5 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={1}
            flexWrap="nowrap"
          >
            <Typography variant="body2" fontWeight={700} color="text.primary">
              About Luxora
            </Typography>
            <Typography
              variant="caption"
              onClick={() => router.push("/about")}
              sx={{
                color: "primary.main",
                cursor: "pointer",
                fontWeight: 600,
                flexShrink: 0,
                whiteSpace: "nowrap",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              View full →
            </Typography>
          </Stack>

          {dataLoading ? (
            <Stack spacing={1}>
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  height={24}
                  sx={{ bgcolor: "#ffffff08" }}
                />
              ))}
            </Stack>
          ) : aboutContent ? (
            <Stack spacing={2} sx={{ minWidth: 0 }}>
              {/* Mission Statement */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#6366f1",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    fontSize: "0.65rem",
                    display: "block",
                    mb: 0.75,
                  }}
                >
                  Mission
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.6,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {aboutContent.mission}
                </Typography>
              </Box>

              {/* Story Preview */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#6366f1",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    fontSize: "0.65rem",
                    display: "block",
                    mb: 0.75,
                  }}
                >
                  {aboutContent.storyTitle || "Our Story"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.6,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {aboutContent.storyPart1}
                </Typography>
              </Box>
              {/* {team.length === 0 ? (
                <Typography variant="caption" color="text.secondary">
                  No Teams yet.
                </Typography>
              ) : (
                <Stack spacing={1}>
                  {team.map((p) => (
                    <ProductMiniCard
                      key={p.id}
                      product={p}
                      onClick={() => router.push("/dashboard/about")}
                    />
                  ))}
                </Stack>
              )} */}
            </Stack>
          ) : (
            <Typography variant="caption" color="text.secondary">
              No about content yet.
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <QuickLinks />
      </Box>
    </Box>
  );
}
