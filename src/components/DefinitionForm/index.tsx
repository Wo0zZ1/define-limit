import { FC, useEffect } from 'react'
import Latex from 'react-latex'
import { useDispatch, useSelector } from 'react-redux'

import { setDefinitionForm } from '../../store/slices/globalSlice'
import { RootState } from '../../store'

import InputBox from '../InputBox'
import { IFormProps } from '../../utils/types'

const DefinitionForm: FC<IFormProps> = ({ type }) => {
	const data = useSelector(
		(state: RootState) => state.globalSlice.definitionForm,
	)

	const dispatch = useDispatch()

	if (type === 'display') {
		return (
			<div className='flex items-center gap-2 p-4 min-h-[130px] bg-white rounded-lg shadow-md relative max-w-full text-sm max-[600px]:overflow-y-auto sm:text-lg md:text-xl lg:text-2xl'>
				<Latex>{`$ \\forall ε > 0 \\space ∃δ = δ(ε) > 0: \\forall ${'x'}: ${'x < -δ'} \\Rightarrow ${'|f(x) - 27|'} < ε $`}</Latex>
			</div>
		)
	}

	return (
		<div className='flex items-center gap-2 p-4 min-h-[130px] bg-white rounded-lg shadow-md relative max-w-full text-sm max-[600px]:overflow-y-auto sm:text-lg md:text-xl lg:text-2xl'>
			<Latex>
				{`$\\forall ε > 0 \\space \\exists δ = δ(ε) > 0: \\forall ${'x'}: $`}
			</Latex>
			<InputBox
				value={data.gamma}
				handler={value =>
					dispatch(setDefinitionForm({ ...data, gamma: value }))
				}
				maxLength={12}
			/>
			<Latex>{`$ \\Rightarrow $`}</Latex>
			<InputBox
				value={data.eps}
				handler={value =>
					dispatch(setDefinitionForm({ ...data, eps: value }))
				}
				maxLength={12}
			/>
			<Latex>{`$ <ε $`}</Latex>
		</div>
	)
}

export default DefinitionForm
