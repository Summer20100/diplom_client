import { FC, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth";
import conf from '../configurations/conf';

import './css/normalize01.css';
import './css/styles01.css';

import Header from './components/Header';

export const Client = () => {
  const { documentTitle } = conf;

  useEffect(() => {
    documentTitle('ИдёмВКино');
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