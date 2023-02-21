import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { AppDispatch, RootState } from "../index";
import { AxiosResponse } from "axios";
import { IUser } from "../../types/UserTypes";
import { setFavorites } from "./songs";
import { setUserPlaylists } from "./playlists";
import { IAuthPayload, IAuthResponseData } from "@/types/AuthTypes";
import { getAuthErrorMessage } from "@/pages/AuthPage/utils";

interface IUserState {
  token: string | null;
  isUserDataLoading: boolean;
  authorizedUser: { id: number; name: string } | null;
}

const initialState: IUserState = {
  token: localStorage.getItem("token"),
  authorizedUser: null,
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
    setAuthorizedUser(
      state,
      action: PayloadAction<IUserState["authorizedUser"]>
    ) {
      state.authorizedUser = action.payload;
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
        dispatch(setAuthorizedUser({ id: res.data.id, name: res.data.name }));
      })
      .finally(() => {
        dispatch(setIsUserDataLoading(false));
      });
  };

export const { setToken, setIsUserDataLoading, setAuthorizedUser } =
  userSlice.actions;
export default userSlice.reducer;
