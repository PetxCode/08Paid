import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  changeState: "",
  user: {},
};

const reduxState = createSlice({
  name: "Payment",
  initialState,
  reducers: {
    onChangeState: (state, { payload }) => {
      state.changeState = payload;
    },

    onUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { onChangeState, onUser } = reduxState.actions;

export default reduxState.reducer;
