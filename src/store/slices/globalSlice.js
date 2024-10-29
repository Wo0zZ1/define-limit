import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	limitForm: {
		from: '',
		to: '',
		func: 'f(x)',
		equal: '',
	},
	definitionForm: {
		gamma: '0<|f(x)|<δ',
		eps: '|f(x)-27|',
	},
}

export const globalSlice = createSlice({
	name: 'globalSlice',
	initialState,
	reducers: {
		setLimitForm: (state, data) => {
			state.limitForm = data.payload
		},
		setDefinitionForm: (state, data) => {
			state.definitionForm = data.payload
		},
	},
})

export const { increment } = globalSlice.actions

export default globalSlice.reducer
