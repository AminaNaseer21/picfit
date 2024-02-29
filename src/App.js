import Navbar from "./Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import Wardrobe from "./pages/Wardrobe";
import { Route, Routes } from "react-router-dom";

function App() {
  
  return (
  <>
    <Navbar/>
    <div className="container">
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/wardrobe" element={ <Wardrobe />} />
        <Route path="/upload" element={ <Upload />} />
        <Route path="/profile" element={ <Profile />} />
      </Routes>
    </div>
  </>
  )
}

export default App