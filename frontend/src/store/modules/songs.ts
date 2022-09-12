import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { ISong } from "../../types/SongsTypes";
import { RootState } from "../index";
import { api } from "../../utils/api";

export interface ISongsState {
  discover: ISong[];
  favorites: ISong[];
  isFavoritesLoading: boolean;
  search: ISong[];
}

const initialState: ISongsState = {
  discover: [],
  favorites: [],
  isFavoritesLoading: false,
  search: [],
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<ISong[]>) {
      state.favorites = action.payload;
    },
    setIsFavoritesLoading(state, action: PayloadAction<boolean>) {
      state.isFavoritesLoading = action.payload;
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
  (songId: number) => async (dispatch: Dispatch, getState: () => RootState) => {
    const song = getState().songs.discover.find((song) => song.id === songId);
    if (song) {
      api.post("users/favorite", { songId });
      dispatch(setFavorites([...getState().songs.favorites, song]));
    }
  };

export const removeFavorite =
  (songId: number) => async (dispatch: Dispatch, getState: () => RootState) => {
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

export const {
  setFavorites,
  setIsFavoritesLoading,
  setDiscoverSongs,
  setSearchSongs,
} = songsSlice.actions;

export default songsSlice.reducer;
