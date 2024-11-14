import { Route, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from './components/auth/signin'
import Signup from './components/auth/signup';
import { AuthProvider } from './helpers/contexts/AuthContext';
import { RequireAuth } from './helpers/RequireAuth';
import { RequireNoAuth } from './helpers/RequireNoAuth';
function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<RequireNoAuth><Signin/></RequireNoAuth>}/>
          <Route path='/signup' element={<RequireNoAuth><Signup/></RequireNoAuth>}/>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
