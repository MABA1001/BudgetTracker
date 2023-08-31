import NavBar from './Components/Navbar';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LogIn from './Pages/Login';
import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard';
import NoPage from './Pages/NoPage';
import { useAuth } from './Context/AuthContext';
import Analytics from './Pages/Analytics';

function App() {
  const { token } = useAuth();

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        {token ? <Route path="/Analytics" element={<Analytics />} /> : null}
        {token ? <Route path="/Dashboard" element={<Dashboard />} /> : null}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default App;
