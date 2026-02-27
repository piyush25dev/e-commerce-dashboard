// app/admin/about/page.jsx
"use client";

import { useState, useEffect } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";

import AboutContentSection from "./components/AboutContentSection";
import ValuesSection from "./components/ValuesSection";
import TeamSection from "./components/TeamSection";
import StatsSection from "./components/StatsSection";

export default function AboutPageAdmin() {
  const [activeTab, setActiveTab] = useState(0);

  // About Content State
  const [aboutContent, setAboutContent] = useState(null);
  const [aboutLoading, setAboutLoading] = useState(false);

  // Values State
  const [values, setValues] = useState([]);
  const [valuesLoading, setValuesLoading] = useState(false);

  // Team State
  const [team, setTeam] = useState([]);
  const [teamLoading, setTeamLoading] = useState(false);

  // Stats State
  const [stats, setStats] = useState([]);
  const [statsLoading, setStatsLoading] = useState(false);

  // ── Fetch About Content ───────────────────────────────────────────────────
  const fetchAboutContent = async () => {
    setAboutLoading(true);
    try {
      const snap = await getDocs(collection(db, "aboutContent"));
      if (snap.docs.length > 0) {
        const data = snap.docs[0].data();
        setAboutContent({ id: snap.docs[0].id, ...data });
      }
    } catch (error) {
      console.error("Error fetching about content:", error);
    } finally {
      setAboutLoading(false);
    }
  };

  // ── Fetch Values ──────────────────────────────────────────────────────────
  const fetchValues = async () => {
    setValuesLoading(true);
    try {
      const snap = await getDocs(collection(db, "aboutValues"));
      setValues(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error fetching values:", error);
    } finally {
      setValuesLoading(false);
    }
  };

  // ── Fetch Team ────────────────────────────────────────────────────────────
  const fetchTeam = async () => {
    setTeamLoading(true);
    try {
      const snap = await getDocs(collection(db, "aboutTeam"));
      setTeam(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error fetching team:", error);
    } finally {
      setTeamLoading(false);
    }
  };

  // ── Fetch Stats ────────────────────────────────────────────────────────────
  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const snap = await getDocs(collection(db, "aboutStats"));
      setStats(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchAboutContent();
    fetchValues();
    fetchTeam();
    fetchStats();
  }, []);

  return (
    <Box>
      {/* Tabs */}
      <Box sx={{ borderBottom: "1px solid #ffffff0d", mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, val) => setActiveTab(val)}
          sx={{
            "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
            "& .Mui-selected": { color: "#6366f1" },
            "& .MuiTabs-indicator": { backgroundColor: "#6366f1" },
          }}
        >
          <Tab label="About Content" />
          <Tab label="Core Values" />
          <Tab label="Team Members" />
          <Tab label="Statistics" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && (
        <AboutContentSection
          aboutContent={aboutContent}
          loading={aboutLoading}
          onRefresh={fetchAboutContent}
        />
      )}

      {activeTab === 1 && (
        <ValuesSection
          values={values}
          loading={valuesLoading}
          onRefresh={fetchValues}
        />
      )}

      {activeTab === 2 && (
        <TeamSection
          team={team}
          loading={teamLoading}
          onRefresh={fetchTeam}
        />
      )}

      {activeTab === 3 && (
        <StatsSection
          stats={stats}
          loading={statsLoading}
          onRefresh={fetchStats}
        />
      )}
    </Box>
  );
}