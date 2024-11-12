import { ChangeEvent, FC } from 'react'

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

	return (
		<input
			style={{
				width: getInputWidth(value.length, size),
				height: size,
			}}
			className={`${className} flex p-${
				size === 32 ? 1 : 0
			} outline-none text-center border focus:border-solid invalid:border-dashed border-black/60 font-mono text-[29px]`}
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
