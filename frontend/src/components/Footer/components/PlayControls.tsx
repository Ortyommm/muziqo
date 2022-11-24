import { Grid } from "@mui/material";

import * as React from "react";
import { useAppSelector } from "@/store";

import ShuffleAndRepeat from "./ShuffleAndRepeat";
import PrevPlayNext from "./PrevPlayNext";
import SongDurationSlider from "./SongDurationSlider";
import FavoriteSongIcon from "@/components/FavoriteSongIcon/FavoriteSongIcon";

export default function PlayControls() {
  const currentSongId = useAppSelector((state) => state.audio.currentSongId);

  return (
    <Grid xs={6} container item alignItems="center">
      <Grid container item xs={3.5} sx={{ display: "flex" }}>
        <ShuffleAndRepeat />
        {currentSongId && <FavoriteSongIcon songId={currentSongId} />}
      </Grid>
      <Grid item xs={4}>
        <SongDurationSlider />
      </Grid>
      <Grid
        xs={4.5}
        container
        item
        justifyContent="flex-end"
        sx={{ display: "flex" }}
      >
        <PrevPlayNext />
      </Grid>
    </Grid>
  );
}
