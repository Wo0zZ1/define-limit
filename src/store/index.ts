import { configureStore } from '@reduxjs/toolkit'

import globalSlice from './slices/globalSlice.ts'

export const store = configureStore({
	reducer: {
		globalSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
