import { FC } from 'react';
import Header from './Header';

const OpenSales: FC = () => {
  return (
    <section className="conf-step">
      <Header title={true} h2="Открыть продажи"/>
      <div className="conf-step__wrapper text-center">
        <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
        <button className="conf-step__button conf-step__button-accent">Открыть продажу билетов</button>
      </div>
    </section>
  );
}
export default OpenSales;