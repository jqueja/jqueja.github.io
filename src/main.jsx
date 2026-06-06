import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const root = document.getElementById('react-root') || (() => { const el = document.createElement('div'); el.id = 'react-root'; document.body.appendChild(el); return el })()
createRoot(root).render(<App />)
