import { FC } from 'react';
import Header from './Header';
import FilmRegistration from "../components/FilmRegistration";

const OpenSales: FC = () => {
  return (
    <section className="conf-step">
      <Header title={true} h2="Открыть продажи"/>
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph text-center">Всё готово, теперь можно:</p>
        <FilmRegistration/>
      </div>
    </section>
  );
}
export default OpenSales;