import { Route, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from './components/auth/signin'
import Signup from './components/auth/signup';
import { AuthProvider } from './helpers/contexts/AuthContext';
import { RequireAuth } from './helpers/RequireAuth';
import { RequireNoAuth } from './helpers/RequireNoAuth';
import PatientDashboard from './pages/PatientDashboard';
import DoctorAppointment from './pages/DoctorAppointment';
import DoctorDashboard from './pages/DoctorDashboard';
import RootRedirect from './components/auth/rootRedirect';
import AdminDashboard from './pages/AdminDashboard';
function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Routes>
          <Route path='/'  element={<RootRedirect />}/>
          <Route path='/signup' element={<RequireNoAuth><Signup/></RequireNoAuth>}/>
          <Route path='/patient-dashboard' element={<RequireAuth><PatientDashboard /></RequireAuth>}/>
          <Route path='/doctor-appointment' element={<RequireAuth><DoctorAppointment/></RequireAuth>}/>
          <Route path='/doctor-dashboard' element={<RequireNoAuth><DoctorDashboard/></RequireNoAuth>}/>
          <Route path='/admin-dashboard' element={<RequireAuth><AdminDashboard/></RequireAuth>}/>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
