import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Headers from './Components/Headers';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import { History } from './Components/History';

import Error from './Components/Error';
import { Routes, Route } from "react-router-dom"
import { Footer } from './Components/Footer';

function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/data-table' element={<History/>} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
