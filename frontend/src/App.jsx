import React from 'react' 
import { useAuth } from '@clerk/clerk-react'
import { Navigate, Route, Routes } from 'react-router'
import AuthPage from './pages/AuthPage.jsx'
import HomePage from './pages/HomePage.jsx'
import CallPage from './pages/CallPage.jsx'
import * as Sentry from "@sentry/react"

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App = () => {

  const {isSignedIn, IsLoaded} = useAuth(); 
  if (!IsLoaded){
    return null;
  }

  return (
    <>
    {/* <button onClick={ () => toast.success("Congrats 🎉") }>success</button> */}
    {/* <button onClick={ () => toast.error("Congrats 🎉") }>success</button> */}
    {/* <button onClick={() => {
      throw new Error("Test Sentry Error")
    } }>Throw Error</button> */}

        <SentryRoutes>
          <Route path='/' element={ isSignedIn ? <HomePage />  : <Navigate to={"/auth"} replace />} />
          <Route path='/auth' element={ !isSignedIn ? <AuthPage/> : <Navigate to={"/"} replace />} />


          <Route path='/call/:id' element={ isSignedIn ? <CallPage />  : <Navigate to={"/auth"} replace />} />
          <Route path='*' element={ isSignedIn ? <Navigate to={"/"} replace /> : <Navigate to={"/auth"} replace />} />
        </SentryRoutes>

      </>
  )
}

export default App
