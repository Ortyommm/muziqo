import { Box, Grid, Paper } from "@mui/material";
import * as React from "react";
import VolumeControl from "./VolumeControl";
import PlayControls from "./PlayControls";
import SongsData from "./SongsData";
import PrevPlayNext from "./components/PrevPlayNext";
import ShuffleAndRepeat from "./components/ShuffleAndRepeat";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  if (location.pathname === "/auth") return <></>;
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: { xs: 100, md: 64 },
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
        <Grid container alignItems="center">
          <SongsData />
          <PlayControls />
          <VolumeControl />
        </Grid>
        <Grid container sx={{ display: { xs: "flex", md: "none" } }}>
          <Grid item xs={4} ml={2}>
            <ShuffleAndRepeat />
          </Grid>
          <Grid item xs={7}>
            <PrevPlayNext />
          </Grid>
          {/*<VolumeControl />*/}
        </Grid>
      </Box>
    </Paper>
  );
}
