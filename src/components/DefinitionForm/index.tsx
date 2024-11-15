import { useEffect, type FC } from 'react'
import Latex from 'react-latex'
import { useDispatch, useSelector } from 'react-redux'

import {
	reset,
	setDefinitionForm,
} from '../../store/slices/globalSlice'
import { RootState } from '../../store'

import { InputBox } from '../'

import { IFormProps } from '../../types'

const DefinitionForm: FC<IFormProps> = ({ type }) => {
	const data = useSelector(
		(state: RootState) => state.globalSlice,
	)

	const dispatch = useDispatch()

	useEffect(() => {
		if (!data.limitForm.correct) dispatch(reset())
	}, [])

	if (type === 'display')
		return (
			<div className='flex items-center gap-2 p-4 overflow-x-auto max-w-full min-h-[4rem] lg:min-h-[6rem] bg-white rounded-lg shadow-md relative text-sm sm:text-lg md:text-xl lg:text-2xl'>
				<Latex>{`$ \\forall ε > 0 \\space ∃δ = δ(ε) > 0: \\forall ${data.argumentChar}: ${data.definitionForm.delta} \\Rightarrow ${data.definitionForm.eps} ε $`}</Latex>
			</div>
		)

	return (
		<div
			style={{
				outline: !data.definitionForm.correct
					? '2px solid rgb(194 65 12 / 0.6)'
					: '',
			}}
			className='flex items-center gap-2 p-4 overflow-x-auto max-w-full min-h-[4rem] lg:min-h-[6rem] bg-white rounded-lg shadow-md relative text-sm sm:text-lg md:text-xl lg:text-2xl'>
			<Latex>
				{`$\\forall ε > 0 \\space \\exists δ = δ(ε) > 0: \\forall ${data.argumentChar}: $`}
			</Latex>
			<InputBox
				value={data.definitionForm.delta}
				handler={value =>
					dispatch(
						setDefinitionForm({
							...data.definitionForm,
							delta: value,
						}),
					)
				}
				maxLength={12}
			/>
			<Latex>{`$ \\Rightarrow $`}</Latex>
			<InputBox
				value={data.definitionForm.eps}
				handler={value =>
					dispatch(
						setDefinitionForm({
							...data.definitionForm,
							eps: value,
						}),
					)
				}
				maxLength={12}
			/>
			<Latex>{`$ ε $`}</Latex>
		</div>
	)
}

export default DefinitionForm
