import {
	Routes,
	Route,
	BrowserRouter,
	Navigate,
} from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store'

import { LimitToDefinition, DefinitionToLimit } from './pages'
import { useEffect } from 'react'
import { db } from './utils'

const App = () => {
	useEffect(() => {
		db.post('./log')
	}, [])

	return (
		<BrowserRouter>
			<Provider store={store}>
				<div className='flex flex-col justify-between h-full'>
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
				</div>
			</Provider>
		</BrowserRouter>
	)
}

export default App
