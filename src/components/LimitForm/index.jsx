import { useEffect, useRef } from 'react'

import InputBox from '../InputBox'
import Limit from '../limit'

const LimitForm = () => {
	const boxRef = useRef()

	useEffect(() => {
		console.log(boxRef.current.innerWidth)
	}, [boxRef])

	return (
		<div className='flex justify-center p-4 items-center min-w-[350px] min-h-[130px] bg-white rounded-lg shadow-md relative'>
			<Limit className='mt-6' />
			<div className='flex gap-2 items-center -mt-4'>
				<InputBox
					defaultValue={'f(x)'}
					link={boxRef}
					size={48}
				/>
				<span className=''>=</span>
				<InputBox max={10} className='' />
			</div>
		</div>
	)
}
export default LimitForm
