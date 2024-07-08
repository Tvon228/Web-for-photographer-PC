import { createSlice } from "@reduxjs/toolkit"

export interface IAuthState {
	opened: boolean
}

const initialState: IAuthState = {
	opened: false,
}

const addphotoslice = createSlice({
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

export const { closeAddPhotoModal, openAddPhotoModal } = addphotoslice.actions
export default addphotoslice.reducer
