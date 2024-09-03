import { FC, useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import { useFilmsStore } from "../../../store/films";
import { IMovieDate, IMovieInfo } from "../../models/IMovieDate";
import Legend from "./components/Legend";

export const Hall = () => {
  const location = useLocation();
  const { state } = location;
  const { id, hallTitle, time } = state;
  const { films, fetchDataFilms } = useFilmsStore();
  // const { id } = useParams();

  useEffect(() => {
    fetchDataFilms();
  }, [fetchDataFilms]);

  const film = films.filter(el => el.id === parseInt(id))
  const { title } = film[0]
  
  return (
    <>
      <main>
        <section className="buying">
          <div className="buying__info">
            <div className="buying__info-description">
              <h2 className="buying__info-title">{ title }</h2>
              <p className="buying__info-start">Начало сеанса: { time }</p>
              <p className="buying__info-hall">{ hallTitle }</p>          
            </div>
            <div className="buying__info-hint">
              <p>Тапните дважды,<br/>чтобы увеличить</p>
            </div>
          </div>
          <div className="buying-scheme">
            <div className="buying-scheme__wrapper">
              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                </div>  

              <div className="buying-scheme__row">
                  <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_taken"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                </div>  

              <div className="buying-scheme__row">
                  <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                </div>  

              <div className="buying-scheme__row">
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_vip"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_vip"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                </div>  

              <div className="buying-scheme__row">
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_vip"></span><span className="buying-scheme__chair buying-scheme__chair_vip"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_vip"></span><span className="buying-scheme__chair buying-scheme__chair_vip"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                </div>  

              <div className="buying-scheme__row">
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_vip"></span><span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_taken"></span><span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                </div>  

              <div className="buying-scheme__row">
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_vip"></span><span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_taken"></span><span className="buying-scheme__chair buying-scheme__chair_vip"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                </div>  

              <div className="buying-scheme__row">
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_selected"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_selected"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                </div>  

              <div className="buying-scheme__row">
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                </div>  

              <div className="buying-scheme__row">
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_taken"></span><span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                  <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                </div>
            </div>
            <Legend />
          </div>
          <button className="acceptin-button" onClick="location.href='payment.html'" >Забронировать</button>
        </section>     
      </main>
    </>
  );
}

export default Hall