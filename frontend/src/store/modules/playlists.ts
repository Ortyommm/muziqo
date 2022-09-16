import { IPlaylist } from "../../types/PlaylistsTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../index";
import { api } from "../../utils/api";
import { getAllSongs } from "./dispatchSong";

export interface IPlaylistsState {
  userPlaylists: IPlaylist[];
}

const initialState: IPlaylistsState = {
  userPlaylists: [],
};

const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    setUserPlaylists(state, action: PayloadAction<IPlaylist[]>) {
      state.userPlaylists = action.payload;
    },
  },
});

export const { setUserPlaylists } = playlistsSlice.actions;

export const addSongToPlaylist =
  (songId: number, playlistId: number) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const data = { songId, playlistId };

    api.post(`playlists/add-song`, data);
    // const updatedPlaylists = getState().playlists.userPlaylists.map(
    //   (playlist) => {
    //     if (playlist.id === playlistId) {
    //       // const song = getAllSongs(getState().songs).find(
    //       //   (song) => song.id === songId
    //       // );
    //       console.log(playlist.songs);
    //       // if (song) playlist.songs = [...playlist.songs, song];
    //     }
    //     return playlist;
    //   }
    // );
    // setUserPlaylists(updatedPlaylists);
    // dispatch(addSongToPlaylist(data));
  };

export default playlistsSlice.reducer;
