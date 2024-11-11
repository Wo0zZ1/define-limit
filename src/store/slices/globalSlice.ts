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

export const globalSlice = createSlice({
	name: 'globalSlice',
	initialState,
	reducers: {
		setLimitForm: (
			state,
			action: PayloadAction<ILimitState>,
		) => {
			state.limitForm = action.payload

			// eps
			const parsedFunction = /([a-zA-Z])\(([a-zA-Z])\)/.exec(
				state.limitForm.func,
			)
			if (!parsedFunction) return
			const [functionChar, argumentChar] = parsedFunction.slice(
				1,
				3,
			)

			state.limitForm.from = argumentChar // Изменить аргумент

			if (state.limitForm.equal === '0')
				state.definitionForm.eps = `|${functionChar}(${argumentChar})|`
			else
				state.definitionForm.eps = `|${functionChar}(${argumentChar})-${state.limitForm.equal}|`

			// gamma
			if ('+-'.includes(state.limitForm.to[0])) {
				let sign: '+' | '-'
				if (state.limitForm.to[0] === '+') sign = '+'
				else sign = '-'

				if (state.limitForm.to[1] === '∞') {
					if (state.limitForm.to === '+∞') {
						// +∞
						state.definitionForm.gamma = `${argumentChar}>δ`
					} else if (state.limitForm.to === '-∞')
						// -∞
						state.definitionForm.gamma = `${argumentChar}<-δ`
				} else if (
					state.limitForm.to[1] === '0' &&
					state.limitForm.to.length === 2
				) {
					// +0, -0
					state.definitionForm.gamma = `${
						sign === '+'
							? `0<${argumentChar}<δ`
							: `0<-${argumentChar}<δ`
					}`
				}
			} else if (state.limitForm.to[0] === '0') {
				if (state.limitForm.to === '0')
					// 0 + 0, 0 - 0
					state.definitionForm.gamma = `0<|${argumentChar}|<δ`
				else if ('+-'.includes(state.limitForm.to[1])) {
					let sign: '+' | '-'
					if (state.limitForm.to[1] === '+') sign = '+'
					else sign = '-'

					if (
						state.limitForm.to.replace(' ', '')[2] === '0' &&
						state.limitForm.to.replace(' ', '').length === 3
					) {
						state.definitionForm.gamma = `${
							sign === '+'
								? `0<${argumentChar}<δ`
								: `0<-${argumentChar}<δ`
						}`
					}
				}
			} else if (state.limitForm.to === '∞') {
				// ∞
				state.definitionForm.gamma = `|${argumentChar}|>δ`
			} else {
				// num, num - 0, num + 0
				if (Number.isInteger(state.limitForm.to)) {
					// num
					state.definitionForm.gamma = `0<|${argumentChar}-${state.limitForm.to}|<δ`
				} else if (
					state.limitForm.to.replace(' ', '').includes('+0')
				) {
					// num + 0
					state.definitionForm.gamma = `0<${argumentChar}-${state.limitForm.to.slice(
						0,
						state.limitForm.to.indexOf('+0'),
					)}<δ`
				} else if (
					state.limitForm.to.replace(' ', '').includes('-0')
				) {
					// num + 0
					state.definitionForm.gamma = `0<${state.limitForm.to.slice(
						0,
						state.limitForm.to.indexOf('+0'),
					)}-${argumentChar}<δ`
				}
			}
		},
		setDefinitionForm: (
			state,
			action: PayloadAction<IDefinitionState>,
		) => {
			state.definitionForm = action.payload
			// calculate(state, 2)
		},
	},
})

export const { setLimitForm, setDefinitionForm } =
	globalSlice.actions

export default globalSlice.reducer
