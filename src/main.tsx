import ReactDOM from 'react-dom/client'

import App from './App.js'

import 'katex/dist/katex.min.css'

import './styles/index.scss'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement!)
root.render(<App />)
