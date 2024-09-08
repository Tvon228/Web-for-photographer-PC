import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Gallery } from "@/types/entity.types"

export interface EditModalState {
	opened: boolean
	galleryData: Gallery | null
}

const initialState: EditModalState = {
	opened: false,
	galleryData: null,
}

const editModalSlice = createSlice({
	name: "editModal",
	initialState,
	reducers: {
		openEditModal: (state, action: PayloadAction<Gallery>) => {
			state.opened = true
			state.galleryData = action.payload // Сохраняем данные галереи
		},
		closeEditModal: (state) => {
			state.opened = false
			state.galleryData = null // Сбрасываем данные галереи
		},
	},
})

export const { openEditModal, closeEditModal } = editModalSlice.actions
export default editModalSlice.reducer
