import Signup from "./components/Signup"
import './App.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Notfound from "./components/Notfound";
import Chat from "./components/Chat";
import Login from "./components/Login";

function App() {
  return (
    <div >
      <BrowserRouter>

        <Navbar />
        <Routes>


          <Route element={<Signup />} path="Signup" />
          <Route element={<Chat />} path="chat" />
          <Route element={<Login />} path="login" />
          <Route element={<Notfound />} path="*" />


        </Routes>
      </BrowserRouter>
    </div>

  );
}


export default App;