import {
  fetchFileAndGetUrl,
  pause,
  play,
  setCurrentSongId,
  setDuration,
} from "./audio";
import { AppDispatch } from "../index";
import { ISong } from "../../types/SongsTypes";
import { ISongsState, setCurrentSongsSource } from "./songs";

function getCurrentSongsByLocation() {
  if (window.location.pathname === "/discover") return "discover";
  return "favorites";
}

async function changeSong(
  {
    //audio file src
    file,
    id,
    duration,
    changeSource = true,
  }: {
    file: string;
    id: number;
    duration: string | number;
    changeSource?: boolean;
  },
  dispatch: AppDispatch
) {
  dispatch(pause());
  await dispatch(fetchFileAndGetUrl(file));
  dispatch(setCurrentSongId(id));
  dispatch(setDuration(+duration));
  if (changeSource)
    dispatch(setCurrentSongsSource(getCurrentSongsByLocation()));
  dispatch(play());
}

function getNextSong(songs: ISong[], currentSongId: number | null) {
  const currentSongIndex = songs.findIndex((song) => song.id === currentSongId);
  if (currentSongIndex === songs.length - 1 || currentSongIndex === -1) {
    return songs[0];
  } else {
    return songs[currentSongIndex + 1];
  }
}

function getPrevSong(songs: ISong[], currentSongId: number | null) {
  const currentSongIndex = songs.findIndex((song) => song.id === currentSongId);
  if (currentSongIndex === 0 || currentSongIndex === -1) {
    return songs[songs.length - 1];
  } else {
    return songs[currentSongIndex - 1];
  }
}

function getAllSongsExceptFavorites(state: ISongsState) {
  return [...state.search, ...state.discover];
}

function getAllSongs(state: ISongsState) {
  return [...getAllSongsExceptFavorites(state), ...state.favorites];
}

export {
  changeSong,
  getNextSong,
  getPrevSong,
  getAllSongsExceptFavorites,
  getAllSongs,
};
// function prev(state) {
//     const currentSongIndex = songs.findIndex(
//         (song) => song.id === state.currentSongId
//     );
//     if (currentSongIndex === -1) {
//         setStateFieldsBySong(state, state.songs[0]);
//         return;
//     }
//     if (currentSongIndex === 0) {
//         setStateFieldsBySong(state, state.songs[state.songs.length - 1]);
//     } else {
//         setStateFieldsBySong(state, state.songs[currentSongIndex - 1]);
//     }
// },
