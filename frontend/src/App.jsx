import { useAuth } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import CallPage from "./pages/CallPage";

import * as Sentry from "@sentry/react";

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  return (
    <>
      {/* Debug buttons for testing (optional) */}
      {/* <button onClick={() => toast.success("Congrats 🎉")}>Success</button> */}
      {/* <button onClick={() => toast.error("Oops ❌")}>Error</button> */}
      {/* <button onClick={() => { throw new Error("Test Sentry Error") }}>Throw Error</button> */}

      <SentryRoutes>
        <Route
          path="/"
          element={isSignedIn ? <HomePage /> : <Navigate to={"/auth"} replace />}
        />
        <Route
          path="/auth"
          element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />}
        />
        <Route
          path="/call/:id"
          element={isSignedIn ? <CallPage /> : <Navigate to={"/auth"} replace />}
        />
        <Route
          path="*"
          element={isSignedIn ? <Navigate to={"/"} replace /> : <Navigate to={"/auth"} replace />}
        />
      </SentryRoutes>
    </>
  );
};

export default App;
