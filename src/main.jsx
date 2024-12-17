import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
      <ToastContainer />
  </StrictMode>,
)
