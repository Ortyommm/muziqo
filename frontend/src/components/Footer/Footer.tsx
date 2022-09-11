import { Grid, Paper } from "@mui/material";
import * as React from "react";
import VolumeControl from "./VolumeControl";
import PlayControls from "./PlayControls";
import SongsData from "./SongsData";

export default function Footer() {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        elevation: 3,
        display: "flex",
      }}
    >
      <Grid container alignItems="center">
        <SongsData />
        <PlayControls />
        <VolumeControl />
      </Grid>
    </Paper>
  );
}
