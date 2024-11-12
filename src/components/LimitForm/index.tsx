import { FC, useEffect } from 'react'
import Latex from 'react-latex'
import { useDispatch, useSelector } from 'react-redux'

import { setLimitForm } from '../../store/slices/globalSlice'
import { RootState } from '../../store'

import InputBox from '../InputBox'
import { IFormProps } from '../../utils/types'

const LimitForm: FC<IFormProps> = ({ type }) => {
	const data = useSelector(
		(state: RootState) => state.globalSlice,
	)

	const dispatch = useDispatch()

	if (type === 'display') {
		return (
			<div className='flex justify-center p-4 items-center min-w-[350px] min-h-[130px] bg-white rounded-lg shadow-md relative text-3xl'>
				<Latex>{`$\\lim_{x\\to +\\infty}=${27}$`}</Latex>
			</div>
		)
	}

	return (
		<div className='flex justify-center p-4 items-center min-w-[350px] min-h-[130px] bg-white rounded-lg shadow-md relative text-3xl'>
			<div className='mt-6 relative w-[100px] h-[80px]'>
				<div className={`absolute left-1/2 -translate-x-1/2`}>
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

			<div className='flex gap-2 items-center -mt-4'>
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
