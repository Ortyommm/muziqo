import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
import audioReducer from "./modules/audio";
import songsReducer from "./modules/songs";
import usersReducer from "./modules/users";
import playlistsReducer from "./modules/playlists";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    audio: audioReducer,
    songs: songsReducer,
    playlists: playlistsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
