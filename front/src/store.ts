import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux"

import addphoto from "./slice/addphoto"
import photoReducer from "./slice/photoSlice"
import modalReducer from "./slice/modal"
import cardsSlice from "./slice/cards"
import editModal from "./slice/editModal"
import formModal from "./slice/formModal"

import { api } from "./api"


export const store = configureStore({
	reducer: {
		addphoto: addphoto,
		editModal: editModal,
		formModal: formModal,
		photo: photoReducer,
		modal: modalReducer,
		cards: cardsSlice,
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
