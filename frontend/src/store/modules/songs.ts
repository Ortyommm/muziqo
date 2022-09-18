import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { ISong } from "../../types/SongsTypes";
import { AppDispatch, RootState } from "../index";
import { api } from "../../utils/api";
import { AxiosResponse } from "axios";

export interface ISongsState {
  discover: ISong[];
  favorites: ISong[];
  search: ISong[];
}

const initialState: ISongsState = {
  discover: [],
  favorites: [],
  search: [],
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<ISong[]>) {
      state.favorites = action.payload;
    },
    setDiscoverSongs(state, action: PayloadAction<ISong[]>) {
      state.discover = action.payload;
    },
    setSearchSongs(state, action: PayloadAction<ISong[]>) {
      state.search = action.payload;
    },
  },
});

export const addFavorite =
  (songId: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const song = getState().songs.discover.find((song) => song.id === songId);
    if (song) {
      api.post("users/favorite", { songId });
      dispatch(setFavorites([...getState().songs.favorites, song]));
    }
  };

export const removeFavorite =
  (songId: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const song = getState().songs.discover.find((song) => song.id === songId);
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
      dispatch(setDiscoverSongs([...getState().songs.discover, res.data]));
    });
  };

export const { setFavorites, setDiscoverSongs, setSearchSongs } =
  songsSlice.actions;

export default songsSlice.reducer;
