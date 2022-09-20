import { Button, Grid, IconButton, Slider } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShuffleIcon from "@mui/icons-material/Shuffle";

import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  setCurrentTimeBySlider,
  toggle,
  toggleRepeat,
  toggleShuffle,
} from "../../store/modules/audio";
import {
  changeSong,
  getNextSong,
  getPrevSong,
} from "../../store/modules/dispatchSong";
import ShuffleAndRepeat from "./components/ShuffleAndRepeat";
import PrevPlayNext from "./components/PrevPlayNext";

export default function PlayControls() {
  const dispatch = useAppDispatch();

  const currentTime = useAppSelector((state) => state.audio.currentTime);
  const duration = useAppSelector((state) => state.audio.duration);
  const currentTimePercent = duration ? (currentTime / duration) * 100 : 0;

  function onCurrentTimeChange(event: Event, value: number | number[]) {
    if (Array.isArray(value) || !duration) return;

    dispatch(setCurrentTimeBySlider((duration / 100) * value));
  }

  return (
    <Grid xs={6} container item alignItems="center">
      <Grid
        container
        item
        xs={2.5}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <ShuffleAndRepeat />
      </Grid>
      <Grid item xs={12} md={5}>
        <Slider value={currentTimePercent} onChange={onCurrentTimeChange} />
      </Grid>
      <Grid
        xs={4.5}
        container
        item
        justifyContent="flex-end"
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <PrevPlayNext />
      </Grid>
    </Grid>
  );
}
