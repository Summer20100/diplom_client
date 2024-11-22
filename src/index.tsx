import { useEffect, useState } from 'react';
import conf from './layouts/configurations/conf';
import ReactDOM from 'react-dom/client';
import Client from './layouts/client/Client';
import Admin from './layouts/admin/Admin';
import Login from './layouts/admin/Login';
import Films from './layouts/client/pages/films/Films';
import Hall from './layouts/client/pages/halls/Hall';
import Payment from './layouts/client/pages/Payment';
import Ticket from './layouts/client/pages/Ticket';

import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "./layouts/store/users";

function App() {
  const location = useLocation();
  const { updateFavicon } = conf;
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

  useEffect(() => {
    const handleStorageChange = () => {
      setRoles(localStorage.getItem('roles'));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/admin":
        updateFavicon("/admin.png");
        document.title = "ИдёмВКино | Админка";
        break;
      case "/client":
        updateFavicon("/client.png");
        document.title = "ИдёмВКино | ПрямоСейчас";
        break;
      default:
        updateFavicon("/cinema.png");
        document.title = "ИдёмВКино | Авторизация";
        break;
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!isValid) {
      console.log("token не валидный");
      localStorage.clear();
      navigate('/');
    } else {
      console.log("token валидный");
    }
  }, [isValid]);

  return (
    <Routes>
      { (!isValid && roles === null) && <Route path="*" element={<Login />} /> }
      { (isValid && roles?.includes("ADMIN")) && <Route path="/admin" element={<Admin />} /> }
      { (isValid && roles?.includes("CLIENT")) && 
        <Route path="/client/*" element={<Client />}>
          <Route index element={<Films />} />
          <Route path="hall/:id" element={<Hall />} />
          <Route path="payment" element={<Payment />} />
          <Route path="ticket" element={<Ticket />} />
        </Route>
      }
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);