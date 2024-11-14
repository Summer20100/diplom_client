import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Client from './layouts/client/Client';
import Admin from './layouts/admin/Admin';
import Login from './layouts/admin/Login';
import Films from './layouts/client/pages/films/Films';
import Hall from './layouts/client/pages/halls/Hall';
import Payment from './layouts/client/pages/Payment';
import Ticket from './layouts/client/pages/Ticket';

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useUser } from "./layouts/store/users";

function App() {
  const { isValid, getUsers } = useUser();
  const navigate = useNavigate();
  const [roles, setRoles] = useState<string | null>(localStorage.getItem('roles'));

  useEffect(() => {
    getUsers();
    const handleStorageChange = () => {
      setRoles(localStorage.getItem('roles'));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [roles]);

/*   console.log(localStorage.getItem('roles')) */

/*   useEffect(() => {
    if (!isValid && roles === null) {
      navigate("/");
    };
    if (isValid && roles === "USER") {
      navigate("/client");
    };
    if (isValid && roles === "ADMIN") {
      navigate("/admin");
    };
  }, [isValid, roles, navigate]); */

  useEffect(() => {
    const handleStorageChange = () => {
      setRoles(localStorage.getItem('roles'));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Routes>
      { (!isValid && roles === null) && <Route path="/" element={<Login />} /> }
      { (isValid && roles === "ADMIN") && <Route path="/admin" element={<Admin />} /> }
      { (isValid && roles === "USER") && <Route path="/client/*" element={<Client />}>
          <Route index element={<Films />} />
          <Route path="hall/:id" element={<Hall />} />
          <Route path="payment" element={<Payment />} />
          <Route path="ticket" element={<Ticket />} />
        </Route>
      }
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);