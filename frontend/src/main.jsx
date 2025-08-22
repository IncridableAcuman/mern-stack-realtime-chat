import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <AuthProvider>
              <ThemeProvider>
                    <App />
              </ThemeProvider>
      </AuthProvider>
  </BrowserRouter>
)
