import { IDefinitionState } from './globalSlice'
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

class LimitParser {
	public func: string
	public f: string
	public arg: string
	public infinity: Infinity
	public equal: number

	constructor(
		func: string,
		f: string,
		arg: string,
		infinity: Infinity,
		equal: number,
	) {
		this.func = func
		this.f = f
		this.arg = arg
		this.infinity = infinity
		this.equal = equal
	}

	public getState = () => {
    if this.infinity.
    
		return {
			gamma: `arg ${this.infinity.sign}`,
      eps: `|${func}${}|`
		}
	}
}

class Infinity {
	private s: string
	public sign: '+' | '-' | '' = ''
	public num: '∞' | number = '∞'
	public diff: string = ''

	constructor(s: string) {
		this.s = s
		this.parseSign().parseNum()
	}

	private parseSign = (): Infinity => {
		switch (this.s[0]) {
			case '+':
				this.sign = '+'
				break
			case '-':
				this.sign = '-'
				break
			default:
				this.sign = ''
				break
		}
		return this
	}

	private parseNum = (): Infinity => {
		const temp = this.s.substring(this.sign == '' ? 0 : 1)
		if (temp.includes('∞')) {
			this.num = '∞'
			return this
		}
		const data = /(\d+)([+-]0)?/.exec(temp)?.splice(1, 3)
		if (!data) return this
		this.num = parseInt(data[0])
		this.diff = data[1]
		return this
	}
}

const parseFunction = (s: string): undefined | string[] => {
	const result = /([a-zA-Z])\(([a-zA-Z])\)/.exec(s)?.splice(1, 2)
	if (!result || result.length !== 2) return
	return result
}

const calculateDefinition = (
	limitForm: ILimitState,
): IDefinitionState | undefined => {
	const { from, to, func, equal } = limitForm

	// function and argument
	const data = parseFunction(func)
	if (!data) return
	const [f, arg] = data
	limitForm.from = arg
	//

	// to
	const tmp: Infinity = new Infinity(to)
	//

	const lim: LimitParser = new LimitParser(
		arg,
		tmp,
		parseInt(equal, 10),
	)

	return lim.getState()
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
