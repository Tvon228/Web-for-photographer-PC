import { createSlice } from "@reduxjs/toolkit"

export interface IAuthState {
  opened: boolean
}

const initialState: IAuthState = {
  opened: false
}

const slice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.opened = true
    },
    closeModal: (state) => {
     state.opened = false
    }
  }
})

export const { openModal, closeModal } = slice.actions
export default slice.reducer