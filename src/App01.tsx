import './CSS/styles.css';
import './CSS/normalize.css';
import Admin from './layouts/admin/Admin';
import Login from './layouts/admin/Login';
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="admin" element={<Admin />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </main>
  )
}