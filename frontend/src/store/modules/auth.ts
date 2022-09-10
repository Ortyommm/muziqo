import { createSlice } from "@reduxjs/toolkit";

const initialState: { token: string | null } = {
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", state.token || "");
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
