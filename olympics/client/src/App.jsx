import { useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';

import { NotLoggedRoutes } from './routes/logged-not-logged';

//import { Button as ShadcnButton } from './components/ui/button';

function App() {
  const [user, setUser] = useState({role:'guest'})

  return (
    <>
      <h1 className='text-center text-white py-5 text-3xl font-bold underline my-6 bg-indigo-600' >
        Login - Forgot Password?
      </h1>
      <Routes>

        <Route element={ <NotLoggedRoutes role={user.role} /> }>
          <Route path="/auth" >

            <Route path="login" element={ <Login /> } />
            {/* <Route path="sign-up" element={ <SignUp /> } /> */}
            <Route path="forgot-password" element={ <ForgotPassword /> } />
            {/* <Route path="reset-password" element={ <ResetPassword /> } /> */}

          </Route>
        </Route>
      </Routes>
      {/* <div>
        <ShadcnButton>Click Me</ShadcnButton>
      </div> */}
    </>
  )
}

export default App
