import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { InternshipProvider } from './context/InternshipProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <InternshipProvider>
    <App />
  </InternshipProvider>
)
