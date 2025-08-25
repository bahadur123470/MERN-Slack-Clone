import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <>
    {/* <button onClick={ () => toast.success("Congrats 🎉") }>success</button> */}
    {/* <button onClick={ () => toast.error("Congrats 🎉") }>success</button> */}

      <SignedIn >
        <Routes>
          <Route path='/' element={ <HomePage /> } />
          <Route path='/auth' element={ <Navigate to={"/"} replace />} />
        </Routes>
      </SignedIn>

      <SignedOut>
        <Routes>
          <Route path='/auth' element={ <AuthPage /> } />
          <Route path='*' element={ <Navigate to={"/auth"} replace />} />
        </Routes>
      </SignedOut>

      </>
  )
}

export default App
