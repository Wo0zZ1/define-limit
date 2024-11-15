import { globalState } from '../../types'

export const limitChangeHandler = (state: globalState) => {
	// parsing eps

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
	const parsedEqual1 = RegExp(/^([-+])?(\d+)$/g).exec(
		state.limitForm.equal,
	)

	const parsedEqual2 = RegExp(/^(([-+])?)∞$/g).exec(
		state.limitForm.equal,
	)

	if (parsedEqual1?.[0]) {
		const [sign, num] = parsedEqual1.slice(1, 3)
		if (num === '0')
			state.definitionForm.eps = `|${state.functionChar}(${state.argumentChar})|<`
		else
			state.definitionForm.eps = `|${state.functionChar}(${
				state.argumentChar
			})${sign === '-' ? '+' : '-'}${parseFloat(num)}|<`
	} else if (parsedEqual2?.[0]) {
		const [sign] = parsedEqual2.slice(1, 2)
		if (!sign) state.definitionForm.eps = '|f(x)|>'
		else
			state.definitionForm.eps = `f(x)${
				sign === '-' ? '< -' : '>'
			}`
	}

	// parsing to

	// [-+]?∞
	const condition1 = RegExp(/^([-+]?)\∞$/).exec(
		state.limitForm.to,
	)

	// 0[-+]0 or 0
	const condition2 = RegExp(/^0(?:([-+])0)?$/).exec(
		state.limitForm.to,
	)

	// [-+]?num[-+]0 or num
	const condition3 = RegExp(/^([-+]?)(\d+)(?:([-+])0)?$/).exec(
		state.limitForm.to,
	)

	if (condition1?.[0]) {
		const [sign] = condition1.slice(1, 2)
		switch (sign) {
			case '-':
				state.definitionForm.gamma = state.argumentChar + '<-δ'
				break
			case '+':
				state.definitionForm.gamma = state.argumentChar + '>δ'
				break
			default:
				state.definitionForm.gamma = `0<|${state.argumentChar}|<δ`
				break
		}
	} else if (condition2?.[0]) {
		const [sign] = condition2.slice(1, 2)
		switch (sign) {
			case '+':
				state.definitionForm.gamma = `0<${state.argumentChar}<δ`
				break
			case '-':
				state.definitionForm.gamma = `0<-${state.argumentChar}<δ`
				break
			default:
				state.definitionForm.gamma = `0<|${state.argumentChar}|<δ`
		}
	} else if (condition3?.[0]) {
		const [signNum, num, sign] = condition3.slice(1, 4)
		const signNumToNum = signNum === '-' ? -1 : 1
		switch (sign) {
			case '+':
				state.definitionForm.gamma = `0<${state.argumentChar}${
					signNumToNum === 1 ? '' : '+'
				}${signNumToNum * -parseFloat(num)}<δ`
				break
			case '-':
				state.definitionForm.gamma = `0<${
					signNumToNum * parseFloat(num)
				}-${state.argumentChar}<δ`
				break
			default:
				state.definitionForm.gamma = `0<|${state.argumentChar}${
					signNumToNum === 1 ? '-' : '+'
				}${parseFloat(num)}|<δ`
		}
	}
}

export const definitionChangeHandler = (state: globalState) => {
	// parsing eps

	// |[-+]?f(x)[-+]num|
	const parsedEqual1 = RegExp(
		/^\|([-+]?)([a-zA-Z])\(([a-zA-Z])\)([-+]\d+)\|<$/g,
	).exec(state.definitionForm.eps)

	// |[-+]num[-+]f(x)|
	const parsedEqual2 = RegExp(
		/^\|([-+]?\d+)([-+])([a-zA-Z])\(([a-zA-Z])\)\|<$/g,
	).exec(state.definitionForm.eps)

	// [-+]?f(x)[<>][-+]?
	const parsedEqual3 = RegExp(
		/^([-+]?)([a-zA-Z])\(([a-zA-Z])\)([<>])([-+]?)$/g,
	).exec(state.definitionForm.eps)

	// [-+]?|[-+]?f(x)|[<>][-+]?
	const parsedEqual4 = RegExp(
		/^([-+]?)\|[-+]?([a-zA-Z])\(([a-zA-Z])\)\|([<>])([-+]?)$/g,
	).exec(state.definitionForm.eps)

	if (parsedEqual1?.[0]) {
		const [functionSign, functionChar, argumentChar, num] =
			parsedEqual1.slice(1, 5)
		state.argumentChar = argumentChar
		state.functionChar = functionChar
		if (functionSign === '-')
			state.limitForm.equal = parseFloat(num || '0').toString()
		else
			state.limitForm.equal = (-parseFloat(
				num || '0',
			)).toString()
	} else if (parsedEqual2?.[0]) {
		const [num, functionSign, functionChar, argumentChar] =
			parsedEqual2.slice(1, 5)
		state.argumentChar = argumentChar
		state.functionChar = functionChar
		state.limitForm.equal = (
			(functionSign === '-' ? 1 : -1) * parseFloat(num)
		).toString()
	} else if (parsedEqual3?.[0]) {
		const [
			functionSign,
			functionChar,
			argumentChar,
			sign,
			epsSign,
		] = parsedEqual3.slice(1, 6)
		state.argumentChar = argumentChar
		state.functionChar = functionChar
		const functionSignToBool = functionSign === '-'
		const signToBool = sign === '<'
		const epsSignToBool = epsSign === '-'
		if (
			functionSignToBool != epsSignToBool &&
			functionSignToBool != signToBool
		)
			state.limitForm.equal = '-∞'
		else if (
			functionSignToBool == epsSignToBool &&
			functionSignToBool == signToBool
		)
			state.limitForm.equal = '+∞'
	} else if (parsedEqual4?.[0]) {
		const [absSign, functionChar, argumentChar, sign, epsSign] =
			parsedEqual4.slice(1, 6)
		state.argumentChar = argumentChar
		state.functionChar = functionChar
		const absSignToBool = absSign === '-'
		const signToBool = sign === '<'
		const epsSignToBool = epsSign === '-'

		if (
			absSignToBool === signToBool &&
			signToBool === epsSignToBool
		)
			state.limitForm.equal = '∞'
		else if (
			absSignToBool !== signToBool &&
			signToBool !== epsSignToBool
		)
			state.limitForm.equal = '0'
	}

	// parsing gamma

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
		/^0<\|([-+]?)([a-zA-Z])([-+])(\d+)\|<δ$/g,
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
		const [argumentSign, argumentChar, signNum, num] =
			condition3.slice(1, 5)
		checkArgumentChar(argumentChar)
		const signToInt = signNum === '-' ? -1 : 1
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
