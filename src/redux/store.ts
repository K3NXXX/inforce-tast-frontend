import { configureStore } from '@reduxjs/toolkit'
import globalSlice from './slices/globalSlice'
import productSlice from './slices/productSlice'
export const store = configureStore({
    reducer: { globalSlice, productSlice },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
