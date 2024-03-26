import Navbar from "./Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Wardrobe from "./pages/Wardrobe";
import Outfitter from "./pages/Outfitter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Upload from "./pages/Upload";
import Itempage from "./pages/itempage";
import { Route, Routes } from "react-router-dom";

function App() {
  
  return (
  <>
    <Navbar/>
    <div className="container">
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/wardrobe" element={ <Wardrobe />} />
        <Route path= "/outfitter" element={ <Outfitter />} />
        <Route path="/itempage" element={ <Itempage />} />
        <Route path="/upload" element={ <Upload />} />
        <Route path="/profile" element={ <Profile />} />
        <Route path="/signup" element={ <Signup />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/settings" element={ <Settings />} />
      </Routes>
    </div>
  </>
  )
}

export default App