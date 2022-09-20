import { IconButton } from "@mui/material";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { toggleRepeat, toggleShuffle } from "../../../store/modules/audio";

export default function ShuffleAndRepeat() {
  const dispatch = useAppDispatch();

  const shuffle = useAppSelector((state) => state.audio.shuffle);
  const repeat = useAppSelector((state) => state.audio.repeat);

  function onRepeat() {
    dispatch(toggleRepeat());
  }

  function onShuffle() {
    dispatch(toggleShuffle());
  }

  return (
    <>
      <IconButton onClick={onRepeat}>
        <RepeatIcon color={repeat ? "primary" : undefined} />
      </IconButton>
      <IconButton onClick={onShuffle}>
        <ShuffleIcon color={shuffle ? "primary" : undefined} />
      </IconButton>
    </>
  );
}
