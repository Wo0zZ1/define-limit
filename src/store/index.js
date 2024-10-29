import { configureStore } from '@reduxjs/toolkit'

import globalSlice from './slices/globalSlice'

export const store = configureStore({
	reducer: {
		globalSlice,
	},
})
