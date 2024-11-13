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

	// |f(x)[-+]num| or |f(x)|
	const parsedEqual1 = RegExp(
		/\|([a-zA-Z])\(([a-zA-Z])\)(?:([-+]\d+))?\|/,
	).exec(state.definitionForm.eps)

	// |[-+]num[-+]f(x)|
	const parsedEqual2 = RegExp(
		/\|([-+]?\d+)([-+])([a-zA-Z])\(([a-zA-Z])\)\|/,
	).exec(state.definitionForm.eps)
	if (parsedEqual1?.[0]) {
		const [functionChar, argumentChar, num] = parsedEqual1.slice(
			1,
			4,
		)
		state.argumentChar = argumentChar
		state.functionChar = functionChar
		state.limitForm.equal = (-parseFloat(num || '0')).toString()
	} else if (parsedEqual2?.[0]) {
		const [num, functionSign, functionChar, argumentChar] =
			parsedEqual2.slice(1, 5)
		state.argumentChar = argumentChar
		state.functionChar = functionChar
		state.limitForm.equal = (
			(functionSign === '-' ? 1 : -1) * parseFloat(num)
		).toString()
	}

	// 0<[-+]?x[-+]num<δ
	const condition1 = RegExp(
		/0<([-+]?)([a-zA-Z])([-+]\d+)<δ/g,
	).exec(state.definitionForm.gamma)

	// 0<[-+]?num[-+]x<δ
	const condition2 = RegExp(
		/0<([-+]?\d+)([-+])([a-zA-Z])<δ/g,
	).exec(state.definitionForm.gamma)

	// 0<|[-+]?x[-+]num|<δ
	const condition3 = RegExp(
		/0<\|([-+]?)([a-zA-Z])([-+])(-?\d+)\|<δ/g,
	).exec(state.definitionForm.gamma)

	// 0<|num[-+]x)|<δ
	const condition4 = RegExp(
		/0<\|([-+]?\d+)([-+])([a-zA-Z])\|<δ/g,
	).exec(state.definitionForm.gamma)

	// [-+]?x[<>][-+]?δ
	const condition5 = RegExp(
		/([-+]?)([a-zA-Z])([<>])([-+]?)δ/g,
	).exec(state.definitionForm.gamma)

	// |x|[<>]δ
	const condition6 = RegExp(/\|([a-zA-Z])\|([<>])δ/g).exec(
		state.definitionForm.gamma,
	)

	// 0<x<δ
	const condition7 = RegExp(/0<([-+])?([a-zA-Z])<δ/g).exec(
		state.definitionForm.gamma,
	)

	// parsing gamma
	if (condition1?.[0]) {
		const [argumentSign, argumentChar, num] = condition1.slice(
			1,
			4,
		)
		const parsedNum = parseFloat(num)
		if (argumentSign === '-')
			state.limitForm.to = `${parsedNum}-0`
		else state.limitForm.to = `${-parsedNum}+0`
	} else if (condition2?.[0]) {
		const [num, sign, argumentSign, argumentChar] =
			condition2.slice(1, 4)
		const parsedNum = parseFloat(num)
		if (sign === '+') state.limitForm.to = `${-parsedNum}+0`
		else state.limitForm.to = `${parsedNum}-0`
	} else if (condition3?.[0]) {
		const [argumentSign, argumentChar, sign, num] =
			condition3.slice(1, 5)
		const signToInt = sign === '-' ? -1 : 1
		const argumentSignToInt = argumentSign === '-' ? -1 : 1
		const parsedNum = parseFloat(num)
		state.limitForm.to = (
			argumentSignToInt *
			signToInt *
			-parsedNum
		).toString()
	} else if (condition4?.[0]) {
		const [num, sign, argumentChar] = condition4.slice(1, 4)
		const parsedNum = parseFloat(num)
		const signToInt = sign === '-' ? -1 : 1
		state.limitForm.to = (signToInt * -parsedNum).toString()
	} else if (condition5?.[0]) {
		const [argumentSign, argumentChar, compareSign, gammaSign] =
			condition5.slice(1, 5)
		const argumentSignToInt = argumentSign !== '-'
		const gammaSignToInt = gammaSign !== '-'
		const compareSignToInt = compareSign !== '<'

		if (gammaSignToInt == compareSignToInt)
			state.limitForm.to =
				argumentSignToInt == gammaSignToInt ? '+∞' : '-∞'
	} else if (condition6?.[0]) {
		const [argumentChar, compareSign] = condition6.slice(1, 3)
		state.limitForm.to = compareSign === '<' ? '0' : '∞'
	} else if (condition7?.[0]) {
		const [sign, argumentChar] = condition7.slice(1, 3)
		state.limitForm.to = sign === '-' ? '0-0' : '0+0'
	}
}
