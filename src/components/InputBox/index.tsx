import { ChangeEvent, FC, useEffect } from 'react'

import useMedia from '../../hooks/useMedia'
import { getInputWidth, inputSelectHandler } from '../../utils'

// TODO change type for handler
export interface IInputBoxProps {
	value: string
	handler?: (value: string) => void
	className?: string
	maxLength?: number
	size?: 32 | 48
	disabled?: boolean
}

const InputBox: FC<IInputBoxProps> = ({
	className = '',
	value,
	handler = () => {},
	maxLength = 50,
	size = 32,
	disabled = false,
}) => {
	const changeHandler = (
		e: ChangeEvent<HTMLInputElement>,
	): void => {
		const data = e.target.value
			.replace(/[iI][nN][fF]|&/g, _ => '∞')
			.replace(' ', '')
		handler(data)
	}

	const width1024 = useMedia('width<1024px')

	return (
		<input
			style={{
				width: getInputWidth(
					value.length,
					width1024 ? 0.75 : 1,
					size,
				),
				height: (width1024 ? 0.8 : 1) * size,
				fontSize: (width1024 ? 0.75 : 1) * 29,
			}}
			className={`${className} flex outline-none text-center border focus:border-solid invalid:border-dashed border-black/60 font-mono`}
			required
			maxLength={maxLength}
			disabled={disabled}
			value={value}
			onChange={changeHandler}
			onFocus={inputSelectHandler}
		/>
	)
}

export default InputBox
