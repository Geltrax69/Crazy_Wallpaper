import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from './providers/StoreProvider'
import AppRoutes from './routes/Routes'

function App() {
  // On GitHub Pages the app is served from a subpath (e.g. /Crazy_Wallpaper/);
  // basename keeps client-side routes working there and is a no-op locally.
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined
  return (
    <BrowserRouter basename={basename}>
      <StoreProvider>
        <AppRoutes />
      </StoreProvider>
    </BrowserRouter>
  )
}

export default App
