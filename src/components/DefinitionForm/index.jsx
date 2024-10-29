import Latex from 'react-latex'
import InputBox from '../InputBox'

/*
type = 'input | display'
*/

const DefinitionForm = ({ type }) => {
	return (
		<div className='flex justify-center items-center gap-2 p-4 min-w-[600px] min-h-[130px] bg-white rounded-lg shadow-md relative text-2xl'>
			<Latex>$∀ε&gt;0∃δ=δ(ε)&gt;0:∀X:$</Latex>
			{type === 'input' ? (
				<InputBox defaultValue={'0<|f(x)|<δ'} />
			) : (
				<Latex>{`$0<|f(x)|<δ$`}</Latex>
			)}
			<Latex className=''>$⇒$</Latex>
			{type === 'input' ? (
				<InputBox
					defaultValue={'|f(x)-27|'}
					max={12}
					className=''
				/>
			) : (
				<Latex>{`$&gt;ε$`}</Latex>
			)}
		</div>
	)
}
export default DefinitionForm
