import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from './providers/StoreProvider'
import AppRoutes from './routes/Routes'

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppRoutes />
      </StoreProvider>
    </BrowserRouter>
  )
}

export default App
