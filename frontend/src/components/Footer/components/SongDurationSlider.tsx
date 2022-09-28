import { setCurrentTimeBySlider } from "../../../store/modules/audio";
import { Slider } from "@mui/material";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../store";

export default function SongDurationSlider() {
  const dispatch = useAppDispatch();

  const currentTime = useAppSelector((state) => state.audio.currentTime);
  const duration = useAppSelector((state) => state.audio.duration);
  const currentTimePercent = duration ? (currentTime / duration) * 100 : 0;

  function onCurrentTimeChange(event: Event, value: number | number[]) {
    if (Array.isArray(value) || !duration) return;

    dispatch(setCurrentTimeBySlider((duration / 100) * value));
  }

  return <Slider value={currentTimePercent} onChange={onCurrentTimeChange} />;
}
