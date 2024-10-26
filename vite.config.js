import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@vitejs/plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
			},
		},
	},
	plugins: [react(), svgr()],
})
