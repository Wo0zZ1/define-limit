import { useState } from 'react'
import Latex from 'react-latex'

// const getFormula = data => {
// 	if (typeof data === 'string') {
// 		let temp = data.toLowerCase()
// 		if (!temp.includes('inf') && !temp.includes('&')) return
// 		if ('+-'.includes(temp[0])) data = `${temp[0]}\\infty`
// 		else data = `\\infty`
// 	} else if (!Number.isInteger(data)) {
// 		return alert('Введите число, либо бесконечность')
// 	}
// 	return `Fraction is $lim_{x\\to` + data + `} f(x)$`
// }

const App = () => {
	const [approaching, setApproaching] = useState('')
	const [equal, setEqual] = useState('')

	const approachingHandler = e => {
		const data = e.target.value
		if (Number.isInteger(data)) setApproaching(Number(data))
		else
			setApproaching(data.replace(/[iI][nN][fF]|&/g, _ => '∞'))
	}

	const equalHandler = e => {
		const data = e.target.value
		if (Number.isInteger(data)) setEqual(Number(data))
		else setEqual(data.replace(/[iI][nN][fF]|&/g, _ => '∞'))
	}

	return (
		<div className='flex flex-col items-center w-screen gap-2'>
			<input
				style={{
					width: (approaching.length + 2) * 12 + 'px',
				}}
				className={`flex justify-center items-center outline-none h-[24px] border focus:border-solid invalid:border-dashed border-black/60 font-mono text-[24px]`}
				required
				value={approaching}
				onChange={approachingHandler}
			/>
			<input
				style={{
					width: (equal.length + 2) * 12 + 'px',
				}}
				className={`flex justify-center items-center outline-none h-[24px] border focus:border-solid invalid:border-dashed border-black/60 font-mono text-[24px]`}
				required
				value={equal}
				onChange={equalHandler}
			/>
			<div className='text-3xl'>
				RESULT: &nbsp;
				<Latex>{`$\\lim_{x\\to ${approaching}}=${equal}$`}</Latex>
			</div>
		</div>
	)
}

export default App
