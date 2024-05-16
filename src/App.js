import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'

//pages and components
import Navbar from "./components/navbar";
import Homepage from './pages/homepage';
import SignUp from "./pages/signup";
import Login from "./pages/login";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user?<Homepage/>:<Navigate to='/login'/>}/>
            <Route path="/login" element={!user?<Login />:<Navigate to='/'/>}/>
            <Route path="/signup" element={!user?<SignUp/>:<Navigate to='/'/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
