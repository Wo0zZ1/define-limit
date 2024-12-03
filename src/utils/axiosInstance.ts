import axios from 'axios'

export const db = axios.create({
	baseURL: import.meta.env.VITE_DB_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})
