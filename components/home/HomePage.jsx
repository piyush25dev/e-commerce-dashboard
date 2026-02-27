"use client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import { homeTheme }    from "./homeTheme";
import GlobalStyles     from "./GlobalStyles";
import GridBackground   from "./GridBackground";
import HomeNavbar       from "./HomeNavbar";
import HeroSection      from "./HeroSection";
import FeaturesSection  from "./FeaturesSection";
import FinalCTA         from "./FinalCTA";
import HomeFooter       from "./HomeFooter";

export default function HomePage() {
  return (
    <ThemeProvider theme={homeTheme}>
      {/* MUI baseline reset */}
      <CssBaseline />

      {/* Custom keyframes + utility classes */}
      <GlobalStyles />

      {/* Fixed animated background — behind everything */}
      {/* <GridBackground /> */}

      {/* Page content */}
      {/* <Box sx={{ position: "relative", zIndex: 1 }}> */}
        <HomeNavbar />
        <HeroSection />
        <FeaturesSection />
        <FinalCTA />
        <HomeFooter />
      {/* </Box> */}
    </ThemeProvider>
  );
}