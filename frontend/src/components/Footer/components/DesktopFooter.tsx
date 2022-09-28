import SongsData from "../SongsData";
import PlayControls from "../PlayControls";
import VolumeControl from "../VolumeControl";
import { Grid } from "@mui/material";
import * as React from "react";

export default function DesktopFooter() {
  return (
    <Grid container alignItems="center">
      <SongsData />
      <PlayControls />
      <VolumeControl />
    </Grid>
  );
}
