import {
  fetchFileAndGetUrl,
  pause,
  play,
  setCurrentSongId,
  setDuration,
} from "./audio";
import { AppDispatch } from "../index";
import { ISong } from "../../components/SongsList/types";

async function changeSong(
  {
    //audio file src
    file,
    id,
    duration,
  }: { file: string; id: number; duration: string | number },
  dispatch: AppDispatch
) {
  dispatch(pause());
  await dispatch(fetchFileAndGetUrl(file));
  dispatch(setCurrentSongId(id));
  dispatch(setDuration(+duration));
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

export { changeSong, getNextSong, getPrevSong };
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
