import conf from '../configurations/conf';
import HallManage from './components/HallManage/HallManage';
import HallConfig from './components/HallConfig/HallConfig';
import PriceConfig from './components/PriceConfig/PriceConfig';
import SessionsGrid from './components/SessionsGrid';
import OpenSales from './components/OpenSales';
import Header from './components/Header';
import { usePopup } from '../store/popup';
import { useHallSeats } from '../store/hallsSeats'; 
import { useEffect, FC } from 'react';
import Popup from './components/Popup';

import './CSS/normalize.css';
import './CSS/styles.css';

export function Admin() {
  const { documentTitle, accordeon } = conf;
  const { namePopup } = usePopup();
  const { hallsSeatsById } = useHallSeats();

  useEffect(() => {
    documentTitle('ИдёмВКино');
    accordeon('conf-step__header');
    console.log(hallsSeatsById)
  }, [])

  return (
    <body>
      <Header title={true} subtitle={true} />
      <main className="conf-steps">
        <HallManage />
        <HallConfig />
        <PriceConfig />
        <SessionsGrid />
        <OpenSales />
      </main>
    </body>
  );
}

export default Admin;