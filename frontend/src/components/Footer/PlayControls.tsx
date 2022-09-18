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

export default function PlayControls() {
  const dispatch = useAppDispatch();

  const currentSongsSource = useAppSelector(
    (state) => state.songs.currentSongsSource
  );

  const songs = useAppSelector((state) => state.songs[currentSongsSource]);
  const currentSongId = useAppSelector((state) => state.audio.currentSongId);

  const shuffle = useAppSelector((state) => state.audio.shuffle);
  const repeat = useAppSelector((state) => state.audio.repeat);

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
    changeSong(
      { ...getPrevSong(songs, currentSongId), changeSource: false },
      dispatch
    );
  }

  function onNextClick() {
    changeSong(
      { ...getNextSong(songs, currentSongId), changeSource: false },
      dispatch
    );
  }

  function onRepeat() {
    dispatch(toggleRepeat());
  }

  function onShuffle() {
    dispatch(toggleShuffle());
  }

  return (
    <Grid xs={6} container item alignItems="center">
      <Grid container item xs={1.5}>
        <Grid item xs={6}>
          <IconButton onClick={onRepeat}>
            <RepeatIcon color={repeat ? "primary" : undefined} />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <IconButton onClick={onShuffle}>
            <ShuffleIcon color={shuffle ? "primary" : undefined} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={7.5}>
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
