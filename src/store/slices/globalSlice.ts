import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
	definitionChangeHandler,
	limitChangeHandler,
} from '../libs'

import {
	globalState,
	IDefinitionState,
	ILimitState,
} from '../../types'

const defaultState: globalState = {
	functionChar: 'f',
	argumentChar: 'x',
	limitForm: {
		to: '-∞',
		func: 'f(x)',
		equal: '27',
		correct: true,
	},
	definitionForm: {
		gamma: 'x<-δ',
		eps: '|f(x)-27|',
		correct: true,
	},
}

const initialState: globalState = { ...defaultState }

export const globalSlice = createSlice({
	name: 'globalSlice',
	initialState,
	reducers: {
		setLimitForm: (
			state,
			action: PayloadAction<ILimitState>,
		) => {
			state.limitForm = action.payload
			limitChangeHandler(state)
		},
		setDefinitionForm: (
			state,
			action: PayloadAction<IDefinitionState>,
		) => {
			state.definitionForm = action.payload
			definitionChangeHandler(state)
		},
	},
})

export const { setLimitForm, setDefinitionForm } =
	globalSlice.actions

export default globalSlice.reducer
