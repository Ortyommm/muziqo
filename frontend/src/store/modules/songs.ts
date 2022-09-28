import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { ISong } from "../../types/SongsTypes";
import { AppDispatch, RootState } from "../index";
import { api } from "../../utils/api";
import { AxiosResponse } from "axios";
import { shuffle } from "lodash-es";
import { getAllSongs } from "./dispatchSong";

export interface ISongsState {
  // discover: ISong[];
  favorites: ISong[];
  temp: ISong[];
  currentSongsSource: SongsSources;
  //special
  shuffled: ISong[];
}

export type SongsSources = /*"discover"*/ "favorites" | "temp";

const initialState: ISongsState = {
  // discover: [],
  favorites: [],
  temp: [],
  currentSongsSource: "favorites",
  shuffled: [],
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<ISong[]>) {
      state.favorites = action.payload;
    },
    // setDiscoverSongs(state, action: PayloadAction<ISong[]>) {
    //   state.discover = action.payload;
    // },
    setTempSongs(state, action: PayloadAction<ISong[]>) {
      state.temp = action.payload;
    },
    _setCurrentSongsSource(state, action: PayloadAction<SongsSources>) {
      // if (state.currentSongsSource !== action.payload) {
      state.currentSongsSource = action.payload;
      // }
    },
    setShuffledSongs(state, action: PayloadAction<ISong[]>) {
      state.shuffled = action.payload;
    },
  },
});

export const setCurrentSongsSource =
  (source: SongsSources) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(songsSlice.actions._setCurrentSongsSource(source));
    const state = getState();
    const currentSongId = state.audio.currentSongId;

    const songsWithoutCurrent = state.songs[
      state.songs.currentSongsSource
    ].filter((song) => song.id !== currentSongId);
    const currentSong = state.songs[state.songs.currentSongsSource].find(
      (song) => song.id === currentSongId
    );

    dispatch(setShuffledSongs([...shuffle(songsWithoutCurrent), currentSong!]));
  };

export const addFavorite =
  (songId: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const song = getAllSongs(getState().songs).find(
      (song) => song.id === songId
    );
    if (song) {
      api.post("users/favorite", { songId });
      dispatch(setFavorites([...getState().songs.favorites, song]));
    }
  };

export const removeFavorite =
  (songId: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const song = getAllSongs(getState().songs).find(
      (song) => song.id === songId
    );
    if (song) {
      api.delete("users/favorite", { data: { songId } });
      dispatch(
        setFavorites(
          getState().songs.favorites.filter((song) => song.id !== songId)
        )
      );
    }
  };

export const addSongToDiscover =
  (data: FormData) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    api.post("songs/upload", data).then((res: AxiosResponse<ISong>) => {
      dispatch(setTempSongs([...getState().songs.temp, res.data]));
    });
  };

export const { setFavorites, setTempSongs, setShuffledSongs } =
  songsSlice.actions;

export default songsSlice.reducer;
