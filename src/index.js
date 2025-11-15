import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { getTheme } from './theme';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
function Root() {
  const [mode, setMode] = React.useState(localStorage.getItem('themeMode') || 'light');
  React.useEffect(() => {
    const handler = (e) => {
      if (e.detail?.mode) {
        setMode(e.detail.mode);
        localStorage.setItem('themeMode', e.detail.mode);
      }
    };
    window.addEventListener('themeModeChange', handler);
    return () => window.removeEventListener('themeModeChange', handler);
  }, []);
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={getTheme(mode)}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

root.render(<Root />);