import { createSlice } from "@reduxjs/toolkit"

export interface FormModalState {
	opened: boolean
}

const initialState: FormModalState = {
	opened: false,
}

const formModalSlice = createSlice({
	name: "formModal",
	initialState,
	reducers: {
		openFormModal: (state) => {
			state.opened = true
		},
		closeFormModal: (state) => {
			state.opened = false
		},
	},
})

export const { openFormModal, closeFormModal } = formModalSlice.actions
export default formModalSlice.reducer
