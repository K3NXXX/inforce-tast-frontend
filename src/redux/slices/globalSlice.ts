import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  isAddProductFormOpened: boolean
}

const initialState: IInitialState = {
    isAddProductFormOpened:false
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
       setIsAddProductFormOpened(state,action) {
        state.isAddProductFormOpened = action.payload
       }
    },
})

export const {
    setIsAddProductFormOpened
} = globalSlice.actions

export default globalSlice.reducer
