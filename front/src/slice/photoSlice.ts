import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PhotoState {
	fileNames: Array<{ name: string; size: number; type: string }>
}

const initialState: PhotoState = {
	fileNames: [],
}

const photoSlice = createSlice({
	name: "photo",
	initialState,
	reducers: {
		addPhoto(
			state,
			action: PayloadAction<{ name: string; size: number; type: string }>
		) {
			state.fileNames.push(action.payload)
		},
		removePhoto(state, action: PayloadAction<{ name: string }>) {
			state.fileNames = state.fileNames.filter(
				(file) => file.name !== action.payload.name
			)
		},
		clearPhotos(state) {
			state.fileNames = []
		},
	},
})

export const { addPhoto, removePhoto, clearPhotos } = photoSlice.actions
export default photoSlice.reducer
