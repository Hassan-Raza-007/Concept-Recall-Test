import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import "./App.css"
import axios from "axios"
import { Toaster } from "react-hot-toast"

axios.defaults.url = 'http://localhost:8000'
axios.defaults.withCredentials = true


const App = () => {
  return (<>
    <Toaster position="top-right" toastOptions={{duration:2000}}/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
    </>
  )
}

export default App