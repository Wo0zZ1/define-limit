import { globalState } from '../../types'

export const limitChangeHandler = (state: globalState) => {
	// eps
	const parsedFunction = /([a-zA-Z])\(([a-zA-Z])\)/.exec(
		state.limitForm.func,
	)
	if (!parsedFunction) return
	const [functionChar, argumentChar] = parsedFunction.slice(1, 3)
	state.argumentChar = argumentChar
	state.functionChar = functionChar

	if (state.limitForm.equal === '0')
		state.definitionForm.eps = `|${state.functionChar}(${state.argumentChar})|`
	else if (state.limitForm.equal.length)
		state.definitionForm.eps = `|${state.functionChar}(${state.argumentChar})-${state.limitForm.equal}|`

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
		} else if (Number.isInteger(parseInt(state.limitForm.to))) {
			// -num
			state.definitionForm.gamma = `0<|${argumentChar}${
				sign === '+' ? '-' : '+'
			}${state.limitForm.to.substring(1)}|<δ`
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

		if (!/\D/.test(state.limitForm.to)) {
			// num
			console.log(1)

			state.definitionForm.gamma = `0<|${argumentChar}-${state.limitForm.to}|<δ`
		} else if (state.limitForm.to.includes('+0')) {
			// num + 0
			state.definitionForm.gamma = `0<${argumentChar}-${state.limitForm.to.slice(
				0,
				state.limitForm.to.indexOf('+0'),
			)}<δ`
		} else if (state.limitForm.to.includes('-0')) {
			// num + 0
			state.definitionForm.gamma = `0<${state.limitForm.to.slice(
				0,
				state.limitForm.to.indexOf('-0'),
			)}-${argumentChar}<δ`
		}
	}
}

export const definitionChangeHandler = (state: globalState) => {
	// parsing eps
	const parsedEqual =
		/\|([a-zA-Z])\(([a-zA-Z])\)(?:([-+])(\d+))?\|/.exec(
			state.definitionForm.eps,
		)
	if (!parsedEqual) return
	const [functionChar, argumentChar, sign, num] =
		parsedEqual.slice(1, 5)
	state.argumentChar = argumentChar
	state.functionChar = functionChar
	if (!sign || !num) {
		// |f(x)|
		state.limitForm.equal = '0'
	} else {
		//|f(x) - [num]|
		state.limitForm.equal =
			num === '0' ? '0' : (sign === '+' ? '-' : '') + num
	}

	// 0<x[-+]num<δ
	const condition1 = RegExp(/0<([a-zA-Z])([-+]\d+)<δ/g).exec(
		state.definitionForm.gamma,
	)

	// 0<num[-+]x<δ
	const condition2 = RegExp(
		/0<([-+]?\d+)([-+][a-zA-Z])<δ/g,
	).exec(state.definitionForm.gamma)

	// 0<|x[-+]num|<δ
	const condition3 = RegExp(
		/0<\|([a-zA-Z])([-+])([-+]?\d+)\|<δ/g,
	).exec(state.definitionForm.gamma)

	// 0<|num[-+]x)|<δ
	const condition4 = RegExp(
		/0<\|([-+]?\d+)([-+])([a-zA-Z])\|<δ/g,
	).exec(state.definitionForm.gamma)

	// x(?:(?:<-δ)|(?:>\+?δ))?
	const condition5 = RegExp(
		/([a-zA-Z])(?:(?:(<)-δ)|(?:(>)\+?δ))/g,
	).exec(state.definitionForm.gamma)

	// |x|[<>]δ
	const condition6 = RegExp(/\|([a-zA-Z])\|([<>])δ/g).exec(
		state.definitionForm.gamma,
	)

	// parsing gamma
	if (condition1?.[0]) {
		const [argumentChar, num] = condition1.slice(1, 3)
		const parsedNum = parseFloat(num)
		state.limitForm.to = `${-parsedNum}+0`
	} else if (condition2?.[0]) {
		const [num, sign, argumentChar] = condition2.slice(1, 4)
		const parsedNum = parseFloat(num)
		state.limitForm.to =
			sign === '+' ? `${-parsedNum}-0` : `${parsedNum}-0`
	} else if (condition3?.[0]) {
		const [argumentChar, sign, num] = condition3.slice(1, 4)
		const parsedNum = parseFloat(num)
		state.limitForm.to =
			sign === '+'
				? (-parsedNum).toString()
				: parsedNum.toString()
	} else if (condition4?.[0]) {
		const [num, sign, argumentChar] = condition4.slice(1, 4)
		const parsedNum = parseFloat(num)
		state.limitForm.to =
			sign === '+'
				? (-parsedNum).toString()
				: parsedNum.toString()
	} else if (condition5?.[0]) {
		const [argumentChar, compareSign] = condition5.slice(1, 4)
		state.limitForm.to = compareSign === '<' ? '-∞' : '+∞'
	} else if (condition6?.[0]) {
		const [argumentChar, compareSign] = condition6.slice(1, 3)
		state.limitForm.to = compareSign === '<' ? '0' : '∞'
	}

	// console.log(parsedEqual)
}
