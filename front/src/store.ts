import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import modal from "./slice/modal";
import cardsSlice from "./slice/cards";
import { api } from "./api";

export const store = configureStore({
  reducer: { 
    modal, 
    cards: cardsSlice,
    [api.reducerPath]: api.reducer
  },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;