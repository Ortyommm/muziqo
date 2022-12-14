import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState, store } from "../index";
import { api } from "../../utils/api";
import {
  changeSong,
  changeSongToNext,
  changeSongToPrev,
  getNextSong,
  playNextSongInShuffled,
} from "./dispatchSong";
import { shuffle } from "lodash-es";
import { setShuffledSongs } from "./songs";
import { isSafari } from "../../utils/isSafari";

const initialVolume = +(localStorage.getItem("volume") || 1);
export const audioController = new Audio();
audioController.volume = initialVolume;
audioController.ontimeupdate = (event) => {
  store.dispatch(
      setCurrentTime((event.target! as HTMLAudioElement).currentTime)
  );
}

// store.dispatch(played)
audioController.onended = (event) => {
  const state = store.getState();
  if (state.audio.repeat) {
    store.dispatch(setCurrentTime(0));
    store.dispatch(play());
    return;
  }

  if (state.audio.shuffle) {
    playNextSongInShuffled();
    return;
  }

  const nextSong = getNextSong(
    state.songs[state.songs.currentSongsSource],
    state.audio.currentSongId
  );
  changeSong(nextSong);
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
  volume: initialVolume,
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
      localStorage.setItem("volume", action.payload.toString());
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
    toggle(state) {
      if (!state.currentSongId) return;
      state.isPlaying ? audioController.pause() : audioController.play();
      state.isPlaying = !state.isPlaying;
    },
    _toggleShuffle(state) {
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
  // play,
  toggle,
  setDuration,
  setCurrentTimeBySlider,
  toggleRepeat,
} = audioSlice.actions;

const rawFetchFileAndGetUrl = async (audioSrc: string) => {
  const audioFile = await api.get(audioSrc, { responseType: "blob" });
  return window.URL.createObjectURL(audioFile.data);
};

export const toggleShuffle =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(audioSlice.actions._toggleShuffle());

    dispatch(
      setShuffledSongs(
        shuffle(getState().songs[getState().songs.currentSongsSource])
      )
    );
  };

export const fetchFileAndGetUrl =
  (audioSrc: string) => async (dispatch: AppDispatch) => {
    // dispatch(pause());
    let audioFileSrc =
      process.env.REACT_APP_API_URL +
      audioSrc; /*await rawFetchFileAndGetUrl(audioSrc);*/

    //can't use async in safari
    if (window.caches && !isSafari()) {
      const cache = await window.caches.open("songs");
      const cachedSong = await cache.match(audioFileSrc);
      if (cachedSong) {
        audioFileSrc = window.URL.createObjectURL(await cachedSong.blob());
      }
    }

    dispatch(setAudioControllerSrc(audioFileSrc));
  };

export const play =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().audio;
    if (!state.currentSongId) return;

    const dispatchToggle = () => dispatch(toggle());

    audioController.play().then(() => {
      navigator.mediaSession?.setActionHandler("pause", dispatchToggle);
      navigator.mediaSession?.setActionHandler("play", dispatchToggle);
      navigator.mediaSession?.setActionHandler("nexttrack", changeSongToNext);
      navigator.mediaSession?.setActionHandler(
        "previoustrack",
        changeSongToPrev
      );
    });
    dispatch(setIsPlaying(true));
  };

export default audioSlice.reducer;
