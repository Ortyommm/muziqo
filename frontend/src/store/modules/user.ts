import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { RootState } from "../index";
import { AxiosResponse } from "axios";
import { IUser } from "../../types/UserTypes";
import { setFavorites } from "./songs";
import { setUserPlaylists } from "./playlists";

const initialState: { token: string | null; isUserDataLoading: boolean } = {
  token: localStorage.getItem("token"),
  isUserDataLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", state.token || "");
    },
    setIsUserDataLoading(state, action: PayloadAction<boolean>) {
      state.isUserDataLoading = action.payload;
    },
  },
});

export const getUserData =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setIsUserDataLoading(true));
    api
      .get("users/me")
      .then((res: AxiosResponse<IUser>) => {
        dispatch(setFavorites(res.data.favorites));
        dispatch(setUserPlaylists(res.data.playlists));
      })
      .finally(() => {
        dispatch(setIsUserDataLoading(false));
      });
  };

export const { setToken, setIsUserDataLoading } = userSlice.actions;
export default userSlice.reducer;
