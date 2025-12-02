import { Navigate, Route, Routes } from "react-router-dom"
import Chat from "./Pages/Chat"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Profile from "./Pages/Profile"
import Settings from "./Pages/Settings"
import  useAuthStore  from "./Store/auth-store"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import Navbar from "./Components/Navbar"


function App() {

  const {authUser, CheckAuth, isCheckingauth,} = useAuthStore();

  useEffect(()=> {
    CheckAuth()
  }, [CheckAuth])


  if(isCheckingauth && !authUser) {
    return(
      <div className="flex items-center justify-center h-screen">
         <Loader className="size-10 animate-spin" />
      </div>
    )
  }
 
  return (
    
    <div>
      <Navbar/>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Chat /> : <Navigate to="/login" replace />}
        ></Route>

        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" replace />}
        ></Route>

        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" replace />}
        ></Route>

        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" replace />}
        ></Route>

        <Route
          path="/settings"
          element={authUser ?  <Settings /> : <Navigate to={"/login"} replace />}
        >

        </Route>
      </Routes>
    </div>
  )
}

export default App