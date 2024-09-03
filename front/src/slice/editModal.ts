import { createSlice } from "@reduxjs/toolkit"

export interface EditModalState {
	opened: boolean
}

const initialState: EditModalState = {
	opened: false,
}

const editModalSlice = createSlice({
	name: "editModal",
	initialState,
	reducers: {
		openEditModal: (state) => {
			state.opened = true
		},
		closeEditModal: (state) => {
			state.opened = false
		},
	},
})

export const { openEditModal, closeEditModal } = editModalSlice.actions
export default editModalSlice.reducer
