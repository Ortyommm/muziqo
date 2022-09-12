import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/UserTypes";
import { SliceCaseReducers } from "@reduxjs/toolkit/src/createSlice";

export interface IUserState {
  search: IUser[];
  currentUser: IUser | null;
}

const initialState: IUserState = {
  search: [],
  currentUser: null,
};

//TODO type all states
const usersSlice = createSlice<IUserState, SliceCaseReducers<IUserState>>({
  name: "users",
  initialState,
  reducers: {
    setSearchUsers(state, action: PayloadAction<IUser[]>) {
      state.search = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<IUser>) {
      state.currentUser = action.payload;
    },
  },
});

export const { setSearchUsers, setCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
