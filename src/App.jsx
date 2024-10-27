import { useState } from 'react'
import Latex from 'react-latex'
import { getInputWidth, inputSelectHandler } from './utils'

import {
	LimitToDefinition,
	DefinitionToLimit,
	NotFound,
} from './pages'

import { Routes, Route } from 'react-router-dom'

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
		<>
			<Routes>
				<Route
					path='/limit-to-definition'
					element={<LimitToDefinition />}
					// Component={<LimitToDefinition />}
				/>
				<Route
					path='/definition-to-limit'
					element={<DefinitionToLimit />}
					// Component={<DefinitionToLimit />}
				/>
				<Route
					path='*'
					element={<NotFound />}
					// Component={<NotFound />}
				/>
			</Routes>
			{/* <div className='flex flex-col items-center w-screen gap-2'>
				<input
					style={{
						width: getInputWidth(approaching.length),
					}}
					className={`box-content outline-none h-[18px] p-[6px] pt-[4px] border focus:border-solid invalid:border-dashed border-black/60 font-mono text-[28px]`}
					required
					value={approaching}
					onChange={approachingHandler}
					onFocus={inputSelectHandler}
				/>
				<input
					style={{
						width: getInputWidth(equal.length),
					}}
					className={`box-content outline-none h-[18px] p-[6px] pt-[4px] border focus:border-solid invalid:border-dashed border-black/60 font-mono text-[28px]`}
					required
					value={equal}
					onChange={equalHandler}
					onFocus={inputSelectHandler}
				/>
				<div className='text-3xl'>
					RESULT: &nbsp;
					<Latex>{`$\\lim_{x\\to ${approaching}}=${equal}$`}</Latex>
				</div>
			</div> */}
		</>
	)
}

export default App
