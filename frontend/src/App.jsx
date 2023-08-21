import NavBar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LogIn from "./Pages/Login";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
