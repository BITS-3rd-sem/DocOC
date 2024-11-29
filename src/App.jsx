import { Route, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from './components/auth/signin'
import Signup from './components/auth/signup';
import { AuthProvider } from './helpers/contexts/AuthContext';
import { RequireAuth } from './helpers/RequireAuth';
import { RequireNoAuth } from './helpers/RequireNoAuth';
import PatientDashboard from './pages/PatientDashboard';
function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<RequireNoAuth><Signin/></RequireNoAuth>}/>
          <Route path='/signup' element={<RequireNoAuth><Signup/></RequireNoAuth>}/>
          <Route path='/patient-dashboard' element={<RequireAuth><PatientDashboard /></RequireAuth>}/>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
