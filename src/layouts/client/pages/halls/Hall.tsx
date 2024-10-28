import { FC, useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import { useFilmsStore } from "../../../store/films";
import Legend from "./components/Legend";
import SeatScheme from "./components/SeatScheme"

export const Hall = () => {
  const location = useLocation();
  const { state } = location;
  const { hall_id, hall_title, time, film_id } = state;
  const { films, getFilmById, filmInfo } = useFilmsStore();
  const { id } = useParams();

  useEffect(() => {
    getFilmById(film_id)
  }, [film_id]);

  const seatData = [
    {
    id_seat: 1,
    row_number: 1,
    seat_number: 1,
    chair_type: "vip",
    price: "1000.00",
    hall_title: "Зал 1",
    hall_id: 179
    },
    {
    id_seat: 2,
    row_number: 1,
    seat_number: 2,
    chair_type: "vip",
    price: "1000.00",
    hall_title: "Зал 1",
    hall_id: 179
    },
    {
    id_seat: 3,
    row_number: 1,
    seat_number: 3,
    chair_type: "vip",
    price: "1000.00",
    hall_title: "Зал 1",
    hall_id: 179
    },
    {
    id_seat: 4,
    row_number: 1,
    seat_number: 4,
    chair_type: "vip",
    price: "1000.00",
    hall_title: "Зал 1",
    hall_id: 179
    },
    {
    id_seat: 5,
    row_number: 2,
    seat_number: 1,
    chair_type: "vip",
    price: "1000.00",
    hall_title: "Зал 1",
    hall_id: 179
    },
    {
    id_seat: 6,
    row_number: 2,
    seat_number: 2,
    chair_type: "standart",
    price: "1.00",
    hall_title: "Зал 1",
    hall_id: 179
    },
    {
    id_seat: 7,
    row_number: 2,
    seat_number: 3,
    chair_type: "vip",
    price: "1000.00",
    hall_title: "Зал 1",
    hall_id: 179
    },
    {
    id_seat: 8,
    row_number: 2,
    seat_number: 4,
    chair_type: "disabled",
    price: "10.00",
    hall_title: "Зал 1",
    hall_id: 179
    },
    {
    id_seat: 9,
    row_number: 3,
    seat_number: 1,
    chair_type: "standart",
    price: "1.00",
    hall_title: "Зал 1",
    hall_id: 179
    },
    {
    id_seat: 10,
    row_number: 3,
    seat_number: 2,
    chair_type: "disabled",
    price: "0.00",
    hall_title: "Зал 1",
    hall_id: 179
    },
    {
    id_seat: 11,
    row_number: 3,
    seat_number: 3,
    chair_type: "vip",
    price: "1000.00",
    hall_title: "Зал 1",
    hall_id: 179
    },
    {
    id_seat: 12,
    row_number: 3,
    seat_number: 4,
    chair_type: "disabled",
    price: "0.00",
    hall_title: "Зал 1",
    hall_id: 179
    },
    {
    id_seat: 13,
    row_number: 4,
    seat_number: 1,
    chair_type: "vip",
    price: "1000.00",
    hall_title: "Зал 1",
    hall_id: 179
    },
    {
    id_seat: 14,
    row_number: 4,
    seat_number: 2,
    chair_type: "disabled",
    price: "0.00",
    hall_title: "Зал 1",
    hall_id: 179
    },
    {
    id_seat: 15,
    row_number: 4,
    seat_number: 3,
    chair_type: "standart",
    price: "1.00",
    hall_title: "Зал 1",
    hall_id: 179
    },
    {
    id_seat: 16,
    row_number: 4,
    seat_number: 4,
    chair_type: "standart",
    price: "1.00",
    hall_title: "Зал 1",
    hall_id: 179
    }
    ]

  
  return (
    <>
      <main>
        <section className="buying">
          <div className="buying__info">
            <div className="buying__info-description">
              <h2 className="buying__info-title">{ filmInfo?.title }</h2>
              <p className="buying__info-start">Начало сеанса: { time.session_start.slice(0, 5) }</p>
              <p className="buying__info-hall">{ hall_title }</p>
            </div>
            <div className="buying__info-hint">
              <p>Тапните дважды,<br/>чтобы увеличить</p>
            </div>
          </div>
          <div className="buying-scheme">
{/*             <div className="buying-scheme__wrapper">
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
            </div> */}
            <SeatScheme seats={seatData} />

            <Legend />
          </div>
          <button 
            className="acceptin-button" 
            /* onClick="location.href='payment.html'"  */
          >Забронировать</button>
        </section>     
      </main>
    </>
  );
}

export default Hall