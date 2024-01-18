import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './global.css'
import { App } from './app'
import { GlobalStateProvider } from './global_state'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement!)

root.render(
  <StrictMode>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </StrictMode>
)
