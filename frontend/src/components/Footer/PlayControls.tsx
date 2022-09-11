import { Button, Grid, IconButton, Slider } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { setCurrentTimeBySlider, toggle } from "../../store/modules/audio";
import {
  changeSong,
  getNextSong,
  getPrevSong,
} from "../../store/modules/dispatchSong";

export default function PlayControls() {
  const dispatch = useAppDispatch();

  const songs = useAppSelector((state) => state.audio.songs);
  const currentSongId = useAppSelector((state) => state.audio.currentSongId);

  const currentTime = useAppSelector((state) => state.audio.currentTime);
  const duration = useAppSelector((state) => state.audio.duration);
  const currentTimePercent = duration ? (currentTime / duration) * 100 : 0;

  const isPlaying = useAppSelector((state) => state.audio.isPlaying);

  function onSongToggle() {
    dispatch(toggle());
  }

  function onCurrentTimeChange(event: Event, value: number | number[]) {
    if (Array.isArray(value) || !duration) return;

    dispatch(setCurrentTimeBySlider((duration / 100) * value));
  }

  function onPrevClick() {
    changeSong(getPrevSong(songs, currentSongId), dispatch);
  }

  function onNextClick() {
    changeSong(getNextSong(songs, currentSongId), dispatch);
  }

  return (
    <Grid xs={6} container item alignItems="center">
      <Grid item xs={9}>
        <Slider
          value={currentTimePercent}
          onChange={onCurrentTimeChange}
          // aria-labelledby="input-slider"
        />
      </Grid>
      <Grid xs={3} container item justifyContent="flex-end">
        <Grid container justifyContent="flex-end" item xs={4}>
          <IconButton onClick={onPrevClick}>
            <SkipPreviousIcon />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={onSongToggle}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </Button>
        </Grid>
        <Grid item xs={4}>
          <IconButton onClick={onNextClick}>
            <SkipNextIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
