import {
  Action,
  createAsyncThunk,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { store } from "../index";
import { api } from "../../utils/api";
import { ISong } from "../../types/SongsTypes";
import { changeSong, getNextSong } from "./dispatchSong";

const audioController = new Audio();
audioController.ontimeupdate = (event) =>
  store.dispatch(
    setCurrentTime((event.target! as HTMLAudioElement).currentTime)
  );

audioController.onended = (event) => {
  const state = store.getState();
  if (state.audio.repeat) {
    store.dispatch(setCurrentTime(0));
    store.dispatch(play());
    return;
  }

  // if(state.audio.shuffle) {
  //
  //   return
  // }

  const nextSong = getNextSong(
    state.songs[state.songs.currentSongsSource],
    state.audio.currentSongId
  );
  changeSong(nextSong, store.dispatch);
};

export interface IAudioState {
  duration: null | number;
  isPlaying: boolean;
  currentSongId: null | number;
  currentTime: number;
  audioSrc: string | null;
  volume: number;
  shuffle: boolean;
  repeat: boolean;
}

const initialState: IAudioState = {
  isPlaying: false,
  currentSongId: null,
  currentTime: 0,
  duration: null,
  audioSrc: null,
  volume: 1,
  shuffle: false,
  repeat: false,
};

// function setStateFieldsBySong(state: IAudioState, song: ISong) {
//   state.audioSrc = song.file;
//   state.currentSongId = song.id;
//   state.currentTime = 0;
//   state.duration = +song.duration;
//   audioController.pause();
//   fetchFileAndGetUrl(song.file)(store.dispatch);
// }

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
    play(state: IAudioState) {
      if (!state.currentSongId) return;
      audioController.play();
      state.isPlaying = true;
    },
    toggle(state) {
      if (!state.currentSongId) return;
      state.isPlaying ? audioController.pause() : audioController.play();
      state.isPlaying = !state.isPlaying;
    },
    toggleShuffle(state) {
      state.shuffle = !state.shuffle;
    },
    toggleRepeat(state) {
      state.repeat = !state.repeat;
    },
    //Songs reducer

    // next(state) {
    //   const currentSongIndex = state.songs.findIndex(
    //     (song) => song.id === state.currentSongId
    //   );
    //   if (
    //     currentSongIndex === state.songs.length - 1 ||
    //     currentSongIndex === -1
    //   ) {
    //     setStateFieldsBySong(state, state.songs[0]);
    //   } else {
    //     setStateFieldsBySong(state, state.songs[currentSongIndex + 1]);
    //   }
    // },
    // prev(state) {
    //   const currentSongIndex = state.songs.findIndex(
    //     (song) => song.id === state.currentSongId
    //   );
    //   if (currentSongIndex === -1) {
    //     setStateFieldsBySong(state, state.songs[0]);
    //     return;
    //   }
    //   if (currentSongIndex === 0) {
    //     setStateFieldsBySong(state, state.songs[state.songs.length - 1]);
    //   } else {
    //     setStateFieldsBySong(state, state.songs[currentSongIndex - 1]);
    //   }
    // },
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
  toggleShuffle,
  toggleRepeat,
} = audioSlice.actions;

const rawFetchFileAndGetUrl = async (audioSrc: string) => {
  const audioFile = await api.get(audioSrc, { responseType: "blob" });
  return window.URL.createObjectURL(audioFile.data);
};

export const fetchFileAndGetUrl =
  (audioSrc: string) => async (dispatch: Dispatch) => {
    // dispatch(pause());
    const audioFileSrc = await rawFetchFileAndGetUrl(audioSrc);
    dispatch(setAudioControllerSrc(audioFileSrc));
    // dispatch(play());
  };

export default audioSlice.reducer;
