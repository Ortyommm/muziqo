import { Grid, Slider } from "@mui/material";
import { VolumeUp } from "@mui/icons-material";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { setVolume } from "../../store/modules/audio";

export default function VolumeControl() {
  const volume = useAppSelector((state) => state.audio.volume);
  const dispatch = useAppDispatch();

  function onSliderChange(event: Event, value: number | number[], _: number) {
    if (Array.isArray(value)) return;
    dispatch(setVolume(value / 100));
  }

  return (
    <Grid item container justifyContent="flex-end" xs={3}>
      <Grid
        xs={6}
        container
        item
        spacing={2}
        alignItems="center"
        sx={{ mr: 3, display: "flex" }}
      >
        <Grid item>
          <VolumeUp />
        </Grid>
        <Grid item xs>
          <Slider
            value={volume * 100}
            onChange={onSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
