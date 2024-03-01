import Navbar from "./Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Wardrobe from "./pages/Wardrobe";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";

function App() {
  
  return (
  <>
    <Navbar/>
    <div className="container">
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/wardrobe" element={ <Wardrobe />} />
        <Route path="/profile" element={ <Profile />} />
        <Route path="/signup" element={ <Signup />} />
        <Route path="/login" element={ <Login />} />
      </Routes>
    </div>
  </>
  )
}

export default App