import Latex from 'react-latex'

import InputBox from '../InputBox'

/*
TODO
type = 'input | display'
*/

const LimitForm = ({ type }) => {
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
				<InputBox max={1} className='absolute bottom-0 left-0' />
				<InputBox
					max={3}
					className='absolute bottom-0 -translate-x-[32px] left-full'
				/>
				<div className='absolute bottom-0 -translate-x-1/2 left-1/2 text-2xl'>
					<Latex>{'$\\to$'}</Latex>
				</div>
			</div>

			<div className='flex gap-2 items-center -mt-4'>
				<InputBox defaultValue={'f(x)'} size={48} />
				<Latex>$=$</Latex>
				<InputBox max={10} />
			</div>
		</div>
	)
}
export default LimitForm
