import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './css/index.css'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Store } from "./Redux/Store.ts"
import { ThemeProvider } from "./context/themecontent.tsx"
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
  <Provider store={Store}> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  </ThemeProvider>
)
