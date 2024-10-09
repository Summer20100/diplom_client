import { FC, useEffect } from 'react';
import Header from '../Header';
import Accordeon from './Accordeon';
import { usePopup } from '../../../store/popup';
import { useFilmsStore } from '../../../store/films';
import Film from './Film';

const SessionsGrid: FC = () => {
  const { getFilms, films } = useFilmsStore()
  const { popupConfigOpen } = usePopup();

  const openPopup = () => {
    popupConfigOpen('popupSessionsGrid');
  };

  useEffect(() => {
    getFilms();
  }, [getFilms]);
  
  return (
    <section className="conf-step">
      <Header title={true} h2="Сетка сеансов" />
      <div className="conf-step__wrapper">
        <Accordeon title="hall_title"/>
        {/* <Accordeon title="session_date"/> */}
        {/* <Accordeon title="session_duration"/> */}
        
        <p className="conf-step__paragraph">
          <button className="conf-step__button conf-step__button-accent" onClick={openPopup} >Добавить фильм</button>
        </p>
        
        <div className="conf-step__movies">
          { films && 
            films.map((film) => (
              <Film key={ film.id } {...film} />
            ))
          }
        </div>

        <div className="conf-step__seances">
          <div className="conf-step__seances-hall">
            <h3 className="conf-step__seances-title">Зал 1</h3>
            <div className="conf-step__seances-timeline">
              <div className="conf-step__seances-movie" style={{ width: 60, backgroundColor: 'rgb(133, 255, 137)', left: 0 }}>
                <p className="conf-step__seances-movie-title">Миссия выполнима</p>
                <p className="conf-step__seances-movie-start">00:00</p>
              </div>
              <div className="conf-step__seances-movie" style={{ width: 60, backgroundColor: 'rgb(133, 255, 137)', left: 360 }}>
                <p className="conf-step__seances-movie-title">Миссия выполнима</p>
                <p className="conf-step__seances-movie-start">12:00</p>
              </div>
              <div className="conf-step__seances-movie" style={{ width: 65, backgroundColor: 'rgb(202, 255, 133)', left: 420 }}>
                <p className="conf-step__seances-movie-title">Звёздные войны XXIII: Атака клонированных клонов</p>
                <p className="conf-step__seances-movie-start">14:00</p>
              </div>
            </div>
          </div>
          <div className="conf-step__seances-hall">
            <h3 className="conf-step__seances-title">Зал 2</h3>
            <div className="conf-step__seances-timeline">
              <div className="conf-step__seances-movie" style={{ width: 65, backgroundColor: 'rgb(202, 255, 133)', left: 295 }}>
                <p className="conf-step__seances-movie-title">Звёздные войны XXIII: Атака клонированных клонов</p>
                <p className="conf-step__seances-movie-start">19:50</p>
              </div>
              <div className="conf-step__seances-movie" style={{ width: 60, backgroundColor: 'rgb(133, 255, 137)', left: 660 }}>
                <p className="conf-step__seances-movie-title">Миссия выполнима</p>
                <p className="conf-step__seances-movie-start">22:00</p>
              </div>
            </div>
          </div>
        </div>

        <fieldset className="conf-step__buttons text-center">
          <button className="conf-step__button conf-step__button-regular">Отмена</button>
          <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" />
        </fieldset>
      </div>
    </section>
  );
}
export default SessionsGrid;