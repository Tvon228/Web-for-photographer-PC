import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: any = [ 
    {id: 1, title: "number"}
]

const cardsSlice = createSlice({
	name: "cards",
    initialState,
	reducers: {
        AddCards: (state, action: PayloadAction<any>) => {
            const {id, title} = action.payload
            state.push ({id, title}) 
        },
        DeleteCards: (state, action: PayloadAction<any>) => {
            const cardId = action.payload
            return state.filter((card: any) => card.id !== cardId)
        }
	}
})

export const {AddCards, DeleteCards} = cardsSlice.actions
export default cardsSlice.reducer