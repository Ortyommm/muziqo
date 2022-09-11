import { createSlice } from "@reduxjs/toolkit";

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

export const { setToken } = userSlice.actions;
export default userSlice.reducer;
