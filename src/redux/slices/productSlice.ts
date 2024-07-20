import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { IProduct } from '../../@types/product.type'

export const createProduct = createAsyncThunk(
	'product/createProduct',
	async (params: IProduct) => {
		const { data } = await axios.post(`http://localhost:7777/products`, params)
		return data
	}
)

export const getProducts = createAsyncThunk('product/getProducts', async () => {
	const { data } = await axios.get('http://localhost:7777/products')
	return data
})

export const removeProduct = createAsyncThunk(
	'product/removeProduct',
	async (id: string | undefined) => {
		const { data } = await axios.delete(`http://localhost:7777/products/${id}`)
		return data
	}
)

interface IInitialState {
	products: {
		items: []
		status: string
	}
}

const initialState: IInitialState = {
	products: {
		items: [],
		status: 'loading',
	},
}

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: builder => {
		//getProducts
		builder.addCase(getProducts.pending, state => {
			state.products.items = []
			state.products.status = 'loading'
		})
		builder.addCase(getProducts.fulfilled, (state, action) => {
			state.products.items = action.payload
		})
		builder.addCase(getProducts.rejected, state => {
			state.products.items = []
			state.products.status = 'error'
		})

		//createProduct
		builder.addCase(createProduct.pending, state => {
			state.products.status = 'loading'
		})
		builder.addCase(createProduct.fulfilled, (state, action) => {
			state.products.status = 'loaded'
			//@ts-ignore
			state.products.items.push(action.payload)
		})
		builder.addCase(createProduct.rejected, state => {
			state.products.status = 'error'
		})
		//removeProduct
		builder.addCase(removeProduct.pending, state => {
			state.products.status = 'loading'
		})
		builder.addCase(removeProduct.fulfilled, (state, action) => {
			state.products.status = 'loaded'
			//@ts-ignore
			state.products.items = state.products.items.filter(
				(post: IProduct) => post._id !== action.payload._id
			)
		})
		builder.addCase(removeProduct.rejected, state => {
			state.products.status = 'error'
		})
	},
})

export const {} = productSlice.actions

export default productSlice.reducer
