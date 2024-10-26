import { useState } from 'react'

import { getInputWidth, inputSelectHandler } from '../../utils'

const InputBox = ({ className }) => {
	const [equal, setEqual] = useState('')

	const equalHandler = e => {
		const data = e.target.value
		if (Number.isInteger(data)) setEqual(Number(data))
		else setEqual(data.replace(/[iI][nN][fF]|&/g, _ => '∞'))
	}

	return (
		<input
			style={{
				width: getInputWidth(equal.length),
			}}
			className={`${className} box-content outline-none h-[18px] p-[6px] pt-[4px] border focus:border-solid invalid:border-dashed border-black/60 font-mono text-[28px]`}
			required
			value={equal}
			onChange={equalHandler}
			onFocus={inputSelectHandler}
		/>
	)
}

export default InputBox
