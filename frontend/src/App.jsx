import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AuthContextProvider from './contexts/AuthContext'
import Login from './pages/Login'
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route exact path="/patients" element={<Patients />} />
          <Route exact path="/appointments" element={<Appointments />} />
        </Routes>
      </Router>      
    </AuthContextProvider>    
  )
}

export default App;