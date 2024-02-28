import Navbar from "./Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Wardrobe from "./pages/Wardrobe";
import { Route, Routes } from "react-router-dom";

function App() {
  let component
  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break
    case "/wardrobe":
      component = <Wardrobe />
      break
    case "/profile":
      component = <Profile />
      break
  }
  return (
  <>
    <Navbar/>
    <div className="container">{component}</div>
  </>
  )
}

export default App