import Navbar from "./Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Wardrobe from "./pages/Wardrobe";
import Outfitter from "./pages/Outfitter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Upload from "./pages/Upload";
import WeatherApp from "./pages/WeatherApp";
import Itempage from "./pages/itempage";
import AboutUs from "./pages/Aboutus";
import Capture from "./pages/Capture";
import { UserProvider } from './UserContext';
import { Route, Routes } from "react-router-dom";

function App() {
  
  return (
  <>
    <UserProvider>
    <Navbar/>
    <div className="container">
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/wardrobe" element={ <Wardrobe />} />
        <Route path= "/outfitter" element={ <Outfitter />} />
        <Route path="/item/:itemId" element={<Itempage />} />
        <Route path="/upload" element={ <Upload />} />
        <Route path="/profile" element={ <Profile />} />
        <Route path="/signup" element={ <Signup />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/weatherapp" element={ <WeatherApp />} />
        <Route path="/aboutus" element={ <AboutUs />} />
        <Route path="/capture" element={ <Capture />} />
      </Routes>
    </div>
    </UserProvider>
  </>
  
  )
}

export default App