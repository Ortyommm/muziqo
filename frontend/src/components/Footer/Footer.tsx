import { Grid, Paper } from "@mui/material";
import * as React from "react";
import VolumeControl from "./VolumeControl";
import PlayControls from "./PlayControls";

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
        <Grid item xs={3}></Grid>
        <PlayControls />
        <VolumeControl />
      </Grid>
    </Paper>
  );
}
