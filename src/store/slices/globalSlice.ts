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

const defaultState: globalState = {
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

const initialState: globalState = { ...defaultState }

const parseFunction = (s: string): undefined | string[] => {
	const result = /([a-zA-Z])\(([a-zA-Z])\)/.exec(s)?.splice(1, 2)
	if (!result || result.length !== 2) return
	return result
}

const calculateDefinition = (
	limitForm: ILimitState,
): IDefinitionState | undefined => {
	const { from, to, func, equal } = limitForm

	// const data = /(\d+)([+-]0)?/.exec(temp)?.splice(1, 3)

	// function and argument

	// to
}

const calculateLimit = (
	definitionForm: IDefinitionState,
): ILimitState => {
	const { gamma, eps } = definitionForm
	throw new Error('Function not completed')
}

const calculate = (state: globalState, type: 1 | 2) => {
	console.log(`calculating`)
	// Логика вычислений
	if (type === 1)
		state.definitionForm = calculateDefinition(state.limitForm)
	else if (type === 2)
		state.limitForm = calculateLimit(state.definitionForm)
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
			calculate(state, 1)
		},
		setDefinitionForm: (
			state,
			action: PayloadAction<IDefinitionState>,
		) => {
			state.definitionForm = action.payload
			calculate(state, 2)
		},
	},
})

export const { setLimitForm, setDefinitionForm } =
	globalSlice.actions

export default globalSlice.reducer
