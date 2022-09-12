import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { RootState } from "../index";
import { AxiosResponse } from "axios";
import { ISong } from "../../types/SongsTypes";
import { IUser } from "../../types/UserTypes";
import { setFavorites, setIsFavoritesLoading } from "./songs";

const initialState: { token: string | null } = {
  token: localStorage.getItem("token"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", state.token || "");
    },
  },
});

export const getUserData =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setIsFavoritesLoading(true));
    api
      .get("users/me")
      .then((res: AxiosResponse<IUser>) => {
        dispatch(setFavorites(res.data.favorites));
      })
      .catch((err) => {
        if (err.status === 401) dispatch(setToken(""));
      })
      .finally(() => {
        dispatch(setIsFavoritesLoading(false));
      });
  };

export const { setToken } = userSlice.actions;
export default userSlice.reducer;
