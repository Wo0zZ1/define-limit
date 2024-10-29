import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ILimitState {
	from: string
	to: string
	func: string
	equal: string
}

export interface IDefinitionState {
	gamma: string
	eps: string
}

export interface globalState {
	limitForm: ILimitState
	definitionForm: IDefinitionState
}

const initialState: globalState = {
	limitForm: {
		from: 'x',
		to: '-∞',
		func: 'f(x)',
		equal: '27',
	},
	definitionForm: {
		gamma: 'x<-δ',
		eps: '|f(x)-27|',
	},
}

export const globalSlice = createSlice({
	name: 'globalSlice',
	initialState,
	reducers: {
		setLimitForm: (
			state,
			action: PayloadAction<ILimitState>,
		) => {
			state.limitForm = action.payload
		},
		setDefinitionForm: (
			state,
			action: PayloadAction<IDefinitionState>,
		) => {
			state.definitionForm = action.payload
		},
	},
})

export const { setLimitForm, setDefinitionForm } =
	globalSlice.actions

export default globalSlice.reducer
