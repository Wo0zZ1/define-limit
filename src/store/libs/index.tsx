import { globalState } from '../../types'

export const limitChangeHandler = (state: globalState) => {
	// eps

	// f(x)
	const parsedFunction = RegExp(
		/^([a-zA-Z])\(([a-zA-Z])\)$/g,
	).exec(state.limitForm.func)
	if (parsedFunction?.[0]) {
		const [functionChar, argumentChar] = parsedFunction.slice(
			1,
			3,
		)
		state.argumentChar = argumentChar
		state.functionChar = functionChar
	}

	// [-+]num
	const parsedEqual = RegExp(/^([-+])?(\d+)$/g).exec(
		state.limitForm.equal,
	)

	if (parsedEqual?.[0]) {
		const [sign, num] = parsedEqual.slice(1, 3)
		state.definitionForm.eps = `|${state.functionChar}(${
			state.argumentChar
		})${sign === '-' ? '+' : '-'}${parseFloat(num)}|`
	}

	// gamma
	if ('+-'.includes(state.limitForm.to[0])) {
		let sign: '+' | '-'
		if (state.limitForm.to[0] === '+') sign = '+'
		else sign = '-'

		if (state.limitForm.to[1] === '∞') {
			if (state.limitForm.to === '+∞') {
				// +∞
				state.definitionForm.gamma = `${state.argumentChar}>δ`
			} else if (state.limitForm.to === '-∞')
				// -∞
				state.definitionForm.gamma = `${state.argumentChar}<-δ`
		} else if (
			state.limitForm.to[1] === '0' &&
			state.limitForm.to.length === 2
		) {
			// +0, -0
			state.definitionForm.gamma = `${
				sign === '+'
					? `0<${state.argumentChar}<δ`
					: `0<-${state.argumentChar}<δ`
			}`
		} else if (Number.isInteger(parseInt(state.limitForm.to))) {
			// -num
			state.definitionForm.gamma = `0<|${state.argumentChar}${
				sign === '+' ? '-' : '+'
			}${state.limitForm.to.substring(1)}|<δ`
		}
	} else if (state.limitForm.to[0] === '0') {
		if (state.limitForm.to === '0')
			// 0 + 0, 0 - 0
			state.definitionForm.gamma = `0<|${state.argumentChar}|<δ`
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
						? `0<${state.argumentChar}<δ`
						: `0<-${state.argumentChar}<δ`
				}`
			}
		}
	} else if (state.limitForm.to === '∞') {
		// ∞
		state.definitionForm.gamma = `|${state.argumentChar}|>δ`
	} else {
		// num, num - 0, num + 0

		if (!/\D/.test(state.limitForm.to)) {
			// num
			console.log(1)

			state.definitionForm.gamma = `0<|${state.argumentChar}-${state.limitForm.to}|<δ`
		} else if (state.limitForm.to.includes('+0')) {
			// num + 0
			state.definitionForm.gamma = `0<${
				state.argumentChar
			}-${state.limitForm.to.slice(
				0,
				state.limitForm.to.indexOf('+0'),
			)}<δ`
		} else if (state.limitForm.to.includes('-0')) {
			// num + 0
			state.definitionForm.gamma = `0<${state.limitForm.to.slice(
				0,
				state.limitForm.to.indexOf('-0'),
			)}-${state.argumentChar}<δ`
		}
	}
}

export const definitionChangeHandler = (state: globalState) => {
	// parsing eps

	// |f(x)[-+]num| or |f(x)|
	const parsedEqual1 = RegExp(
		/^\|([a-zA-Z])\(([a-zA-Z])\)(?:([-+]\d+))?\|$/g,
	).exec(state.definitionForm.eps)

	// |[-+]num[-+]f(x)|
	const parsedEqual2 = RegExp(
		/^\|([-+]?\d+)([-+])([a-zA-Z])\(([a-zA-Z])\)\|$/g,
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
		/0<([-+]?)([a-zA-Z])([-+]\d+)<δ$/g,
	).exec(state.definitionForm.gamma)

	// 0<[-+]?num[-+]x<δ
	const condition2 = RegExp(
		/^0<([-+]?\d+)([-+])([a-zA-Z])<δ$/g,
	).exec(state.definitionForm.gamma)

	// 0<|[-+]?x[-+]num|<δ
	const condition3 = RegExp(
		/^0<\|([-+]?)([a-zA-Z])([-+])(-?\d+)\|<δ$/g,
	).exec(state.definitionForm.gamma)

	// 0<|num[-+]x)|<δ
	const condition4 = RegExp(
		/^0<\|([-+]?\d+)([-+])([a-zA-Z])\|<δ$/g,
	).exec(state.definitionForm.gamma)

	// [-+]?x[<>][-+]?δ
	const condition5 = RegExp(
		/^([-+]?)([a-zA-Z])([<>])([-+]?)δ$/g,
	).exec(state.definitionForm.gamma)

	// |x|[<>]δ
	const condition6 = RegExp(/^\|([a-zA-Z])\|([<>])δ$/g).exec(
		state.definitionForm.gamma,
	)

	// 0<x<δ
	const condition7 = RegExp(/^0<([-+])?([a-zA-Z])<δ$/g).exec(
		state.definitionForm.gamma,
	)

	// parsing gamma
	const checkArgumentChar = (argumentChar: string) => {
		state.definitionForm.correct =
			state.argumentChar === argumentChar
	}

	if (condition1?.[0]) {
		const [argumentSign, argumentChar, num] = condition1.slice(
			1,
			4,
		)
		checkArgumentChar(argumentChar)
		const parsedNum = parseFloat(num)
		if (argumentSign === '-')
			state.limitForm.to = `${parsedNum}-0`
		else state.limitForm.to = `${-parsedNum}+0`
	} else if (condition2?.[0]) {
		const [num, sign, argumentChar] = condition2.slice(1, 4)
		checkArgumentChar(argumentChar)
		const parsedNum = parseFloat(num)
		if (sign === '+') state.limitForm.to = `${-parsedNum}+0`
		else state.limitForm.to = `${parsedNum}-0`
	} else if (condition3?.[0]) {
		const [argumentSign, argumentChar, sign, num] =
			condition3.slice(1, 5)
		checkArgumentChar(argumentChar)
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
		checkArgumentChar(argumentChar)
		const parsedNum = parseFloat(num)
		const signToInt = sign === '-' ? -1 : 1
		state.limitForm.to = (signToInt * -parsedNum).toString()
	} else if (condition5?.[0]) {
		const [argumentSign, argumentChar, compareSign, gammaSign] =
			condition5.slice(1, 5)
		checkArgumentChar(argumentChar)
		const argumentSignToInt = argumentSign !== '-'
		const gammaSignToInt = gammaSign !== '-'
		const compareSignToInt = compareSign !== '<'
		if (gammaSignToInt == compareSignToInt)
			state.limitForm.to =
				argumentSignToInt == gammaSignToInt ? '+∞' : '-∞'
	} else if (condition6?.[0]) {
		const [argumentChar, compareSign] = condition6.slice(1, 3)
		checkArgumentChar(argumentChar)
		state.limitForm.to = compareSign === '<' ? '0' : '∞'
	} else if (condition7?.[0]) {
		const [sign, argumentChar] = condition7.slice(1, 3)
		checkArgumentChar(argumentChar)
		state.limitForm.to = sign === '-' ? '0-0' : '0+0'
	}
}
