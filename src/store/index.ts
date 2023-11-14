import { configureStore } from "@reduxjs/toolkit";
import { flightBoardSlice } from "./flightBoard/flightBoardSlice.ts";
import { bookingBoardSlice } from "./bookingBoard/bookingBoardSlice.ts";
import { dataTableSlice } from "./dataTable/dataTableSlice.ts";
import { notificationSlice } from "./notifications/notificationSlice.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    flightBoard: flightBoardSlice.reducer,
    bookingBoard: bookingBoardSlice.reducer,
    dataTable: dataTableSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
