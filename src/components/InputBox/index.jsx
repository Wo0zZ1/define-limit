import { useState } from 'react'

import { getInputWidth, inputSelectHandler } from '../../utils'

const InputBox = ({
	className,
	max,
	defaultValue,
	link,
	size,
}) => {
	const [equal, setEqual] = useState(defaultValue || '')

	if (!size) size = 32

	const equalHandler = e => {
		const data = e.target.value
		if (data.length > max) return
		if (Number.isInteger(data)) setEqual(Number(data))
		else setEqual(data.replace(/[iI][nN][fF]|&/g, _ => '∞'))
	}

	return (
		<input
			ref={link}
			style={{
				width: getInputWidth(equal.length, size),
				height: size,
			}}
			className={`${className} flex outline-none text-center border focus:border-solid invalid:border-dashed border-black/60 font-mono text-[29px]`}
			required
			value={equal}
			onChange={equalHandler}
			onFocus={inputSelectHandler}
		/>
	)
}

export default InputBox
