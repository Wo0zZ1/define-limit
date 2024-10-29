import InputBox from '../InputBox'

const Definition = ({ className }) => {
	return (
		<div className={`${className} relative w-[100px] h-[80px]`}>
			<span
				className={`absolute -translate-x-1/2 left-1/2 text-4xl font-semibold`}>
				lim
			</span>
			<InputBox max={1} className='absolute bottom-0 left-0' />
			<InputBox
				max={3}
				className='absolute bottom-0 -translate-x-[32px] left-full'
			/>
			<span className='absolute bottom-0 -translate-x-1/2 left-1/2 text-2xl'>
				--&gt;
			</span>
		</div>
	)
}

export default Definition
