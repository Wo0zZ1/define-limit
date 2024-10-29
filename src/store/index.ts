import { configureStore } from '@reduxjs/toolkit'

import globalSlice from './slices/globalSlice.ts'

export const store = configureStore({
	reducer: {
		globalSlice,
	},
})
