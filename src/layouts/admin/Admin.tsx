import conf from '../configurations/conf';
import HallManage from './components/HallManage/HallManage';
import HallConfig from './components/HallConfig/HallConfig';
import PriceConfig from './components/PriceConfig/PriceConfig';
import SessionsGrid from './components/SessionsGrid';
import OpenSales from './components/OpenSales';
import Header from './components/Header';
import { useEffect, FC } from 'react';

import './CSS/normalize.css';
import './CSS/styles.css';

export function Admin() {
  const { documentTitle, accordeon } = conf;

  useEffect(() => {
    documentTitle('ИдёмВКино');
    accordeon('conf-step__header');
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