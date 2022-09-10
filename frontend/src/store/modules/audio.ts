import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../index";
import { ISong } from "../../components/SongsList/types";

const audioController = new Audio();
audioController.ontimeupdate = (event) =>
  store.dispatch(
    setCurrentTime((event.target! as HTMLAudioElement).currentTime)
  );

// audioController.onplay = console.log;
const initialState: {
  duration: null | number;
  isPlaying: boolean;
  currentSongId: null | number;
  currentTime: number;
  audioSrc: string | null;
  volume: number;
  songs: ISong[];
} = {
  isPlaying: false,
  currentSongId: null,
  currentTime: 0,
  duration: null,
  audioSrc: null,
  volume: 1,
  songs: [],
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload;
    },
    setCurrentTimeBySlider(state, action: PayloadAction<number>) {
      audioController.currentTime = state.currentTime = action.payload;
    },
    setAudioControllerSrc(state, action: PayloadAction<string>) {
      audioController.src = state.audioSrc = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      audioController.volume = state.volume = action.payload;
    },
    setCurrentSongId(state, action: PayloadAction<number>) {
      state.currentSongId = action.payload;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
    pause(state) {
      if (!state.currentSongId) return;
      audioController.pause();
      state.isPlaying = false;
    },
    play(state) {
      if (!state.currentSongId) return;
      audioController.play();
      state.isPlaying = true;
    },
    toggle(state) {
      if (!state.currentSongId) return;
      state.isPlaying ? audioController.pause() : audioController.play();
      state.isPlaying = !state.isPlaying;
    },
    //Songs reducer
    setSongs(state, action: PayloadAction<ISong[]>) {
      state.songs = action.payload;
    },
  },
});

export const {
  setIsPlaying,
  setVolume,
  setCurrentTime,
  setCurrentSongId,
  setAudioControllerSrc,
  pause,
  play,
  toggle,
  setDuration,
  setCurrentTimeBySlider,
  setSongs,
} = audioSlice.actions;
export default audioSlice.reducer;
