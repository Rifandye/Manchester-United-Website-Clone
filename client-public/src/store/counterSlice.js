import { configureStore, createSlice } from "@reduxjs/toolkit";


const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    tambah: (state, action) => {
      state.count += 1;
    },
  },
});

export const { tambah } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;
