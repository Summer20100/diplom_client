// import './App.css'
import Client from './layouts/client/Client'
import Admin from './layouts/admin/Admin'
import { Routes, Route } from "react-router-dom";
import Login from './layouts/admin/Login';

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/client" element={<Client />} />
      </Routes>
    </main>
  )
}