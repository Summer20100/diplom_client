import { FC, useEffect, useState } from "react";
import { useParams, useLocation } from 'react-router-dom';
import { useFilmsStore } from "../../../store/films";
import { useSessions } from "../../../store/sessions";
import { IQRCode } from "../../../models/IQRCode"
import { useTickets } from "../../../store/tickets"
import Legend from "./components/Legend";
import SeatScheme from "./components/SeatScheme";
import { useNavigate } from 'react-router-dom';

interface ISeat {
  id_seat: number;
  row_number: number;
  seat_number: number;
  chair_type: string;
  price: string;
  hall_title: string;
  hall_id: number;
  session_id: number;
  check_is_buying: boolean;
};

interface IChairsTypes {
  [key: string]: number;
};

interface IChairType {
  chair_type: string;
  price: string;
};

export const Hall = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { hall_id, hall_title, time, film_id } = state;
  const { films, getFilmById, filmInfo } = useFilmsStore();


  const { getSessionById, sessionById, getHallchairsOfSessionsByIdSession, hallchairsOfSessionsByIdSession  } = useSessions();

  const { id } = useParams();

  useEffect(() => {
    getFilmById(film_id);
    getSessionById(time.id);
    getHallchairsOfSessionsByIdSession(time.id)
  }, [film_id, time]);

  const [infoForQRCode, setInfoForQRCode] = useState<IQRCode[]>([])
  const [seatInfoNew, setSeatInfoNew] =  useState<ISeat[]>([])

  const seatInfo = (seats: ISeat[]) => {
    setSeatInfoNew(seats); 
  };

  useEffect(() => {
    if (sessionById && filmInfo) {
      const newQRCodeInfo: IQRCode[] = seatInfoNew.map(seat => ({
          session_date: sessionById.session_date,
          session_start: sessionById.session_start,
          title: filmInfo.title,
          origin: filmInfo.origin,
          duration: filmInfo.duration || 0,
          id_seat: seat.id_seat,
          row_number: seat.row_number,
          seat_number: seat.seat_number,
          chair_type: seat.chair_type,
          price: seat.price,
          hall_title: sessionById.hall_title
      }));
      setInfoForQRCode(newQRCodeInfo);
    }
  }, [seatInfoNew]);

  const newQRCode = () => {
    if (infoForQRCode) {
      const encodedPaymentData = encodeURIComponent(JSON.stringify(infoForQRCode));
      navigate(`/client/payment?data=${encodedPaymentData}`);
    }
  };

  const chairTypes: IChairsTypes = hallchairsOfSessionsByIdSession?.reduce((acc: IChairsTypes, seat: IChairType) => {
    if (!acc[seat.chair_type]) {
      acc[seat.chair_type] = parseFloat(seat.price);
    }
    return acc;
  }, {} as IChairsTypes) ?? {};

  const result: { chair_type: string; price: number }[] = Object.entries(chairTypes).map(([chair_type, price]) => ({
    chair_type,
    price,
  }));


  const { ticketsForBuying, createTicketForBuying, updateTicketForBuying } = useTickets();

  useEffect(() => {
    if (seatInfoNew && seatInfoNew.length !== 0) {
      createTicketForBuying(seatInfoNew);
    }
  }, [seatInfoNew]);
  
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
          { hallchairsOfSessionsByIdSession && (
            <div className="buying-scheme">
              <SeatScheme seats={hallchairsOfSessionsByIdSession} seatInfo={seatInfo} />
              <Legend chairtype={ result } />
            </div>
          )}
          </div>
          <button 
            className="acceptin-button" 
            onClick={(ev:any) => newQRCode()}
            style={{ visibility: seatInfoNew.length > 0 ? 'visible' : 'hidden' }}
          >Забронировать</button>
        </section>     
      </main>
    </>
  );
}

export default Hall