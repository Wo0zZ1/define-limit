/// <reference types="vite-plugin-svgr/client" />

declare module '*.module.scss' {
	const classes: Record<string, string>
	export default classes
}

declare module '*.module.sass' {
	const classes: Record<string, string>
	export default classes
}

declare module '*.module.css' {
	const classes: Record<string, string>
	export default classes
}

interface ImportMetaEnv {
	readonly VITE_DB_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
