import { Route, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from './components/auth/signin'
import Signup from './components/auth/signup';
import { AuthProvider } from './helpers/contexts/AuthContext';
import { RequireAuth } from './helpers/RequireAuth';
import { RequireNoAuth } from './helpers/RequireNoAuth';
import RootRedirect from './components/auth/rootRedirect';
import AdminDashboard from './dashboards/AdminDashboard';
import UsersDashboard from './dashboards/UsersDashboard';
function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path='/signin' element={<RequireNoAuth><Signin/></RequireNoAuth>}/>
          <Route path='/signup' element={<RequireNoAuth><Signup/></RequireNoAuth>}/>
          <Route path='/admin-dashboard' element={<RequireAuth><AdminDashboard/></RequireAuth>}/>
          <Route path='/user-dashboard' element={<RequireAuth><UsersDashboard/></RequireAuth>}/>

          
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
