import {
	Routes,
	Route,
	BrowserRouter,
	Navigate,
} from 'react-router-dom'
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
					<Route
						path='*'
						element={<Navigate to={'limit-to-definition'} />}
					/>
				</Routes>
			</Provider>
		</BrowserRouter>
	)
}

export default App
