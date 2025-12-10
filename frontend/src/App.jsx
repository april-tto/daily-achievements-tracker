import './App.css'
import Homepage from './pages/homepage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Verification from './pages/verify'
import Register from './pages/register';
import AddTask from './pages/addTask'
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onDataRequested={setEmail}/>}/>
        <Route path="/verify" element={<Verification email={email}/>}/>
        <Route path="/homepage" element={<Homepage/>}/>
        <Route path="/register" element={<Register onDataRequested={setEmail}/>}/>
        <Route path="/add-task" element={<AddTask/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
