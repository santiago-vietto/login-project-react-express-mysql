import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import AuthContextProvider from "./context/AuthContextProvider";
import UserContextProvider from "./context/UserContextProvider";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AuthContextProvider>
  </StrictMode>
)
