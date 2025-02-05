import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './scss/style.scss'
import App from './App.jsx'
import { NavBar } from './components/navbar/nav.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="bottom-center" />
    <NavBar/>
    <App />
  </StrictMode>,
)
