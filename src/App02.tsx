import './css/styles.css';
import './css/normalize.css';
import Client from './layouts/client/Client'
import Hall from './layouts/client/pages/Hall'
import Films from './layouts/client/pages/Films';
import Payment from './layouts/client/pages/Payment';
import Ticket from './layouts/client/pages/Ticket';
import { Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/client/*" element={<Client />} >
          <Route index={true} element={<Client />} />
          <Route path="hall" element={<Hall />} />
          <Route path="films" element={<Films />} />
          <Route path="payment" element={<Payment />} />
          <Route path="ticket" element={<Ticket />} />
        </Route>
        {/* <Route path="/client/hall" element={<Hall />} /> */}
        {/* <Route path="client/hall" element={<Hall />} /> */}
      </Routes>
    </main>
  )
}