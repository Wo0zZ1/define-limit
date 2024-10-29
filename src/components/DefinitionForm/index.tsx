import Latex from 'react-latex'
import { useSelector } from 'react-redux'

import InputBox from '../InputBox'

/*
TODO
type = 'input | display'
*/

const DefinitionForm = ({ type }) => {
	const data = useSelector(state => state.DefinitionForm)

	if (type === 'input') {
		return (
			<div className='flex justify-center items-center gap-2 p-4 min-w-[600px] min-h-[130px] bg-white rounded-lg shadow-md relative text-2xl'>
				<Latex>
					{`$\\forall ε > 0 \\space \\exists δ = δ(ε) > 0: \\forall ${'x'}: $`}
				</Latex>
				<InputBox defaultValue={'x<-δ'} />
				<Latex>{`$ \\Rightarrow $`}</Latex>
				<InputBox defaultValue={'|f(x)-27|'} max={12} />
				<Latex>{`$ <ε $`}</Latex>
			</div>
		)
	}

	return (
		<div className='flex justify-center items-center gap-2 p-4 min-w-[600px] min-h-[130px] bg-white rounded-lg shadow-md relative text-2xl'>
			<Latex>{`$ \\forall ε > 0 \\space ∃δ = δ(ε) > 0: \\forall ${'x'}: ${'x < -δ'} \\Rightarrow ${'|f(x) - 27|'} < ε $`}</Latex>
		</div>
	)
}

export default DefinitionForm
