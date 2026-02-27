// components/admin/about/AboutContentSection.jsx
import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  alpha,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import { doc, updateDoc, addDoc, collection } from "firebase/firestore";
import { db } from "@/utils/firebase";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#ffffff18" },
    "&:hover fieldset": { borderColor: "#6366f166" },
    "&.Mui-focused fieldset": { borderColor: "#6366f1" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#6366f1" },
};

export default function AboutContentSection({ aboutContent, loading, onRefresh }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mission, setMission] = useState(aboutContent?.mission || "");
  const [storyTitle, setStoryTitle] = useState(aboutContent?.storyTitle || "");
  const [storyPart1, setStoryPart1] = useState(aboutContent?.storyPart1 || "");
  const [storyPart2, setStoryPart2] = useState(aboutContent?.storyPart2 || "");
  const [saving, setSaving] = useState(false);

  const handleOpenDialog = () => {
    setMission(aboutContent?.mission || "");
    setStoryTitle(aboutContent?.storyTitle || "");
    setStoryPart1(aboutContent?.storyPart1 || "");
    setStoryPart2(aboutContent?.storyPart2 || "");
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!mission.trim() || !storyTitle.trim() || !storyPart1.trim() || !storyPart2.trim()) {
      return;
    }

    setSaving(true);
    try {
      const data = {
        mission: mission.trim(),
        storyTitle: storyTitle.trim(),
        storyPart1: storyPart1.trim(),
        storyPart2: storyPart2.trim(),
      };

      if (aboutContent?.id) {
        await updateDoc(doc(db, "aboutContent", aboutContent.id), data);
      } else {
        await addDoc(collection(db, "aboutContent"), data);
      }

      setDialogOpen(false);
      onRefresh();
    } catch (error) {
      console.error("Error saving about content:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" color="text.primary" sx={{ mb: 3 }}>
        About Luxora & Our Story
      </Typography>

      {loading ? (
        <LinearProgress color="primary" sx={{ height: 2 }} />
      ) : aboutContent ? (
        <Paper elevation={0} sx={{ border: "1px solid #ffffff0d", borderRadius: 3, p: 3, bgcolor: "#13131a" }}>
          <Stack spacing={3}>
            {/* Mission Statement */}
            <Box>
              <Typography variant="subtitle1" sx={{ color: "#ffffff", mb: 2, fontWeight: 600 }}>
                Mission Statement
              </Typography>
              <Card sx={{ bgcolor: alpha("#6366f1", 0.05), border: `1px solid ${alpha("#6366f1", 0.15)}` }}>
                <CardContent>
                  <Typography variant="body2" sx={{ color: "#b0b0b0", lineHeight: 1.8 }}>
                    {aboutContent.mission}
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Divider sx={{ borderColor: "#ffffff08" }} />

            {/* Story */}
            <Box>
              <Typography variant="subtitle1" sx={{ color: "#ffffff", mb: 2, fontWeight: 600 }}>
                Our Story
              </Typography>
              <Stack spacing={2}>
                <Card sx={{ bgcolor: alpha("#6366f1", 0.05), border: `1px solid ${alpha("#6366f1", 0.15)}` }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: "#ffffff", mb: 2 }}>
                      {aboutContent.storyTitle}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#b0b0b0", lineHeight: 1.8, mb: 2 }}>
                      {aboutContent.storyPart1}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#b0b0b0", lineHeight: 1.8 }}>
                      {aboutContent.storyPart2}
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Box>

            {/* Edit Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
              <Button
                variant="contained"
                startIcon={<EditOutlinedIcon />}
                onClick={handleOpenDialog}
                sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "#4f46e5" }, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
              >
                Edit Content
              </Button>
            </Box>
          </Stack>
        </Paper>
      ) : (
        <Paper elevation={0} sx={{ border: "1px solid #ffffff0d", borderRadius: 3, p: 4, bgcolor: "#13131a", textAlign: "center" }}>
          <CodeOutlinedIcon sx={{ fontSize: 40, color: "text.secondary", mb: 2 }} />
          <Typography color="text.secondary" variant="body2" sx={{ mb: 3 }}>
            No content configured yet. Create the initial content.
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "#4f46e5" }, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            Create Content
          </Button>
        </Paper>
      )}

      {/* Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { backgroundImage: "none", backgroundColor: "#1c1c26", border: "1px solid #ffffff12", borderRadius: 3 } }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ width: 32, height: 32, borderRadius: "8px", bgcolor: alpha("#6366f1", 0.15), display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CodeOutlinedIcon sx={{ fontSize: 18, color: "#6366f1" }} />
            </Box>
            <Typography variant="h6" fontWeight={700}>
              Edit About Content
            </Typography>
          </Stack>
        </DialogTitle>

        <Divider sx={{ borderColor: "#ffffff10" }} />

        <DialogContent sx={{ pt: 2.5 }}>
          <Stack spacing={3}>
            {/* Mission Statement */}
            <Box>
              <Typography variant="subtitle2" sx={{ color: "#ffffff", mb: 1.5, fontWeight: 600 }}>
                Mission Statement *
              </Typography>
              <TextField
                label="Mission"
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                fullWidth
                multiline
                rows={4}
                placeholder="At Luxora, we believe that true luxury is found in simplicity and quality..."
                sx={inputSx}
              />
            </Box>

            {/* Story Section */}
            <Box>
              <Typography variant="subtitle2" sx={{ color: "#ffffff", mb: 1.5, fontWeight: 600 }}>
                Our Story
              </Typography>

              <Stack spacing={2}>
                <TextField
                  label="Story Title *"
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  fullWidth
                  size="small"
                  placeholder="e.g. Our Story"
                  sx={inputSx}
                />

                <TextField
                  label="Story - Part 1 *"
                  value={storyPart1}
                  onChange={(e) => setStoryPart1(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Founded in 2020, Luxora began as a passion project..."
                  sx={inputSx}
                />

                <TextField
                  label="Story - Part 2 *"
                  value={storyPart2}
                  onChange={(e) => setStoryPart2(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Every product in our collection is carefully selected..."
                  sx={inputSx}
                />
              </Stack>
            </Box>

            {/* Preview */}
            <Box sx={{ bgcolor: alpha("#6366f1", 0.05), border: `1px solid ${alpha("#6366f1", 0.15)}`, borderRadius: 2, p: 2 }}>
              <Typography variant="caption" sx={{ color: "#6366f1", fontWeight: 600, textTransform: "uppercase" }}>
                Preview
              </Typography>
              <Typography variant="h6" sx={{ color: "#ffffff", mt: 1.5, mb: 1 }}>
                {storyTitle || "Story Title"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#b0b0b0", mb: 1.5 }}>
                {storyPart1 || "First paragraph..."}
              </Typography>
              <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                {storyPart2 || "Second paragraph..."}
              </Typography>
            </Box>
          </Stack>
        </DialogContent>

        <Divider sx={{ borderColor: "#ffffff10" }} />

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setDialogOpen(false)} sx={{ color: "text.secondary", textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!mission.trim() || !storyTitle.trim() || !storyPart1.trim() || !storyPart2.trim() || saving}
            sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2, px: 3 }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}