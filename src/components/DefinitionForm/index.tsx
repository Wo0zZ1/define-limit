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

	// TODO DELETE
	useEffect(() => {
		console.log(data)
	}, [data])

	if (type === 'display') {
		return (
			<div className='flex justify-center items-center gap-2 p-4 min-w-[600px] min-h-[130px] bg-white rounded-lg shadow-md relative text-2xl'>
				<Latex>{`$ \\forall ε > 0 \\space ∃δ = δ(ε) > 0: \\forall ${'x'}: ${'x < -δ'} \\Rightarrow ${'|f(x) - 27|'} < ε $`}</Latex>
			</div>
		)
	}

	return (
		<div className='flex justify-center items-center gap-2 p-4 min-w-[600px] min-h-[130px] bg-white rounded-lg shadow-md relative text-2xl'>
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
