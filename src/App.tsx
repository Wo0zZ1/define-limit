import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store'

import {
	LimitToDefinition,
	DefinitionToLimit,
	NotFound,
} from './pages'

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
	return (
		<BrowserRouter>
			<Provider store={store}>
				<Routes>
					<Route
						path='/limit-to-definition'
						element={<LimitToDefinition />}
					/>
					<Route
						path='/definition-to-limit'
						element={<DefinitionToLimit />}
					/>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Provider>
		</BrowserRouter>
	)
}

export default App
