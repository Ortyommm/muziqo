import { Box, Grid, Paper, useMediaQuery, useTheme } from "@mui/material";
import * as React from "react";
import VolumeControl from "./VolumeControl";
import PlayControls from "./PlayControls";
import SongsData from "./SongsData";
import PrevPlayNext from "./components/PrevPlayNext";
import ShuffleAndRepeat from "./components/ShuffleAndRepeat";
import { useLocation } from "react-router-dom";
import DesktopFooter from "./components/DesktopFooter";
import MobileFooter from "./components/MobileFooter";

export default function Footer() {
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(
    `(min-width: ${theme.breakpoints.values.sm}px)`
  );

  if (location.pathname === "/auth") return <></>;
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: { xs: 150, sm: 64 },
        elevation: 3,
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: { xs: "block", md: "flex" },
          alignItems: "center",
        }}
      >
        {isDesktop ? <DesktopFooter /> : <MobileFooter />}
      </Box>
    </Paper>
  );
}
