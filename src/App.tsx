import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store'

import {
	LimitToDefinition,
	DefinitionToLimit,
	NotFound,
} from './pages'

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
