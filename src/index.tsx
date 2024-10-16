import ReactDOM from 'react-dom/client'
import App from './App'
import App01 from './App01'
import Client from './layouts/client/Client'
import Admin from './layouts/admin/Admin'
import Login from './layouts/admin/Login'

import Films from './layouts/client/pages/films/Films'
import Hall from './layouts/client/pages/halls/Hall'
import Payment from './layouts/client/pages/Payment'
import Ticket from './layouts/client/pages/Ticket'

import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="admin" element={<Admin />} />
      <Route path="login" element={<Login />} />
      <Route path="client/*" element={<Client />} >
        <Route index={true} element={<Films />} />
        <Route path="hall/:id" element={<Hall />} />
        <Route path="payment" element={<Payment />} />
        <Route path="ticket" element={<Ticket />} />
      </Route>
    </Routes>
    {/* <App /> */}
    {/* <App01 /> */}
    {/* <Admin />
    <Client /> */}
  </BrowserRouter>
  // </React.StrictMode>
)