import { createRoot } from 'react-dom/client'

import App from './App.js'

import 'katex/dist/katex.min.css'

import './styles/index.scss'

createRoot(document.getElementById('root')).render(<App />)
