import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: PostState;
};
type PostState = {
  isAddOpen: boolean;
};

const initialState = {
  value: {
    isAddOpen: false,
  },
} as InitialState;

export const post = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setIsAddOpen: (state, action: PayloadAction<boolean>) => {
      return {
        value: {
          ...state,
          isAddOpen: action.payload,
        },
      };
    },
  },
});

export const {setIsAddOpen} = post.actions;
export default post.reducer;