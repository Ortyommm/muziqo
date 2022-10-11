import {
  fetchFileAndGetUrl,
  pause,
  play,
  setCurrentSongId,
  setDuration,
} from "./audio";
import { AppDispatch, store } from "../index";
import { ISong } from "../../types/SongsTypes";
import { ISongsState, setCurrentSongsSource, setShuffledSongs } from "./songs";

function getCurrentSongsByLocation() {
  if (window.location.pathname === "/") return "favorites";
  // if (
  //   window.location.pathname === "/discover" ||
  //   window.location.pathname.startsWith("/users/")
  // )
  return "temp";
}

function changeSong(
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
  //TODO then
  dispatch(fetchFileAndGetUrl(file)).then(() => {
    dispatch(setCurrentSongId(id));
    dispatch(setDuration(+duration));
    if (changeSource)
      dispatch(setCurrentSongsSource(getCurrentSongsByLocation()));
    dispatch(play());
  });
}

function getNextSong(songs: ISong[], currentSongId: number | null) {
  if (store.getState().audio.shuffle) {
    const song = getNextSongInShuffled(false);
    if (song) return song;
  }

  const currentSongIndex = songs.findIndex((song) => song.id === currentSongId);
  if (currentSongIndex === songs.length - 1 || currentSongIndex === -1) {
    return songs[0];
  } else {
    return songs[currentSongIndex + 1];
  }
}

function getPrevSong(songs: ISong[], currentSongId: number | null) {
  if (store.getState().audio.shuffle) {
    const song = getPrevSongInShuffled(false);
    if (song) return song;
  }

  const currentSongIndex = songs.findIndex((song) => song.id === currentSongId);
  if (currentSongIndex === 0 || currentSongIndex === -1) {
    return songs[songs.length - 1];
  } else {
    return songs[currentSongIndex - 1];
  }
}

function getPrevSongInShuffled(shouldPlay: boolean) {
  const state = store.getState();
  const prevSong = state.songs.shuffled[state.songs.shuffled.length - 2];
  const currentSong = state.songs.shuffled[state.songs.shuffled.length - 1];
  if (prevSong) {
    if (shouldPlay) changeSong(prevSong, store.dispatch);
    store.dispatch(
      setShuffledSongs([
        currentSong,
        ...state.songs.shuffled.slice(0, -2),
        prevSong,
      ])
    );
    return prevSong;
  }
}

function getNextSongInShuffled(shouldPlay: boolean) {
  const state = store.getState();
  const song = state.songs.shuffled[0];
  if (song) {
    if (shouldPlay) changeSong(song, store.dispatch);
    store.dispatch(setShuffledSongs([...state.songs.shuffled.slice(1), song]));
    return song;
  }
}

function playNextSongInShuffled() {
  getNextSongInShuffled(true);
}

function getAllSongsExceptFavorites(state: ISongsState) {
  // console.log(state.temp);
  return [...state.temp /*...state.discover*/];
}

function getAllSongs(state: ISongsState) {
  return [...getAllSongsExceptFavorites(state), ...state.favorites];
}

export {
  changeSong,
  getNextSong,
  getPrevSong,
  playNextSongInShuffled,
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
