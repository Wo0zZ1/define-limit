import { type FC } from 'react'
import Latex from 'react-latex'
import { useDispatch, useSelector } from 'react-redux'

import { setLimitForm } from '../../store/slices/globalSlice'
import { RootState } from '../../store'

import { type IFormProps } from '../../types'

import useMedia from '../../hooks/useMedia'

import { InputBox } from '../'

const LimitForm: FC<IFormProps> = ({ type }) => {
	const data = useSelector(
		(state: RootState) => state.globalSlice,
	)

	const dispatch = useDispatch()

	if (type === 'display')
		return (
			<div className='flex p-4 bg-white rounded-lg shadow-md text-sm sm:text-lg md:text-xl lg:text-2xl'>
				<Latex>{`$\\lim_{${data.argumentChar} \\to ${data.limitForm.to}}{${data.functionChar}(${data.argumentChar})}=${data.limitForm.equal}$`}</Latex>
			</div>
		)

	const width1024 = useMedia('width < 1024px')

	return (
		<div
			style={{
				outline: !data.limitForm.correct
					? '2px solid rgb(194 65 12 / 0.6)'
					: '',
			}}
			className='flex p-4 bg-white rounded-lg shadow-md text-sm sm:text-lg md:text-xl lg:text-2xl'>
			<div className='mt-6 relative w-[100px] h-[85px]'>
				<div
					style={{
						fontSize: `${(width1024 ? 1 : 1) * 1.875}rem`,
						lineHeight: `${(width1024 ? 1 : 1) * 2.25}rem`,
					}}
					className={`absolute left-1/2 -translate-x-1/2`}>
					<Latex>{'$\\lim$'}</Latex>
				</div>
				<InputBox
					value={data.argumentChar}
					disabled
					maxLength={1}
					className='absolute bottom-0 left-0'
				/>
				<InputBox
					value={data.limitForm.to}
					handler={value =>
						dispatch(
							setLimitForm({ ...data.limitForm, to: value }),
						)
					}
					maxLength={4}
					className='absolute bottom-0 -translate-x-[32px] left-full'
				/>
				<div className='absolute bottom-0 -translate-x-1/2 left-1/2 text-2xl'>
					<Latex>{'$\\to$'}</Latex>
				</div>
			</div>
			<div className='flex gap-2 items-center -mt-5'>
				<InputBox
					value={data.limitForm.func}
					handler={value =>
						dispatch(
							setLimitForm({ ...data.limitForm, func: value }),
						)
					}
					maxLength={10}
					size={48}
				/>
				<Latex>$=$</Latex>
				<InputBox
					value={data.limitForm.equal}
					handler={value =>
						dispatch(
							setLimitForm({ ...data.limitForm, equal: value }),
						)
					}
					maxLength={10}
				/>
			</div>
		</div>
	)
}
export default LimitForm
