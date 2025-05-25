import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { InternshipProvider } from './context/InternshipProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <InternshipProvider>
    <App />
  </InternshipProvider>
)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("serviceWorker.js")
      .then(() => {
      })
      .catch((err) => {
        console.log("Service Worker registration failed:", err);
      });
  });
}

