import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import "./App.css"
import axios from "axios"
import { Toaster } from "react-hot-toast"
import { UserContextProvider } from '../context/userContext'
// import Router_App from "./config/Router/Router_App"

axios.defaults.url = 'http://localhost:8000'
axios.defaults.withCredentials = true


const App = () => {
  return (
    <UserContextProvider>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>

      {/* <Router_App /> */}
    </UserContextProvider>
  )
}

export default App