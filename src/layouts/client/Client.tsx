import { FC, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth";
import conf from '../configurations/conf';
import Films from "./pages/films/Films";
import Hall from "./pages/halls/Hall";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket"

import './css/normalize01.css';
import './css/styles01.css';

import Header from './components/Header';

export const Client = () => {
  const { documentTitle } = conf;

  useEffect(() => {
    documentTitle('ИдёмВКино | ПрямоСейчас');
  }, []);

  const { logout } = useAuth();

  const backToLogin = () => {
    logout();
    window.location.reload();
  };

  return (
    <>
      <body className="client">
        <Header />
        <Outlet />
      </body>
    </>
  );
}

export default Client