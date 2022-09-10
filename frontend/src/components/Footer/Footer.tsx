import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  Paper,
  Slider,
} from "@mui/material";
import * as React from "react";
import { VolumeUp } from "@mui/icons-material";
import { useAppSelector } from "../../store";
import { useDispatch } from "react-redux";
import {
  setCurrentTime,
  setCurrentTimeBySlider,
  setVolume,
  toggle,
} from "../../store/modules/audio";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import VolumeControl from "./VolumeControl";

export default function Footer() {
  const dispatch = useDispatch();

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
        <Grid item xs={3} />
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
              <IconButton>
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
              <IconButton>
                <SkipNextIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <VolumeControl />
      </Grid>
    </Paper>
  );
}
