import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: PostState;
};
type PostState = {
  isAddOpen: boolean;
  isEditOpen: boolean;
  isDeleteOpen: boolean;
};

const initialState = {
  value: {
    isAddOpen: false,
    isEditOpen: false,
    isDeleteOpen: false
  },
} as InitialState;

export const post = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setIsAddOpen: (state, action: PayloadAction<boolean>) => {
      return {
        value: {
          ...state.value,
          isAddOpen: action.payload,
        },
      };
    },
    setIsEditOpen: (state, action: PayloadAction<boolean>) => {
      return {
        value: {
          ...state.value,
          isEditOpen: action.payload,
        },
      };
    },
    setIsDeleteOpen: (state, action: PayloadAction<boolean>) => {
      return {
        value: {
          ...state.value,
          isDeleteOpen: action.payload,
        },
      };
    },
  },
});

export const {setIsAddOpen, setIsEditOpen, setIsDeleteOpen} = post.actions;
export default post.reducer;