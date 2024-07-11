import { createSlice } from "@reduxjs/toolkit"

export interface IAuthState {
	opened: boolean
}

const initialState: IAuthState = {
	opened: false,
}

const addphotoSlice = createSlice({
	name: "addphoto",
	initialState,
	reducers: {
		openAddPhotoModal: (state) => {
			state.opened = true
		},
		closeAddPhotoModal: (state) => {
			state.opened = false
		},
	},
})

export const { closeAddPhotoModal, openAddPhotoModal } = addphotoSlice.actions
export default addphotoSlice.reducer
