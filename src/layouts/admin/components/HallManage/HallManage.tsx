import { FC, useEffect } from 'react';
import Header from '../Header';
import Hall from './Hall';
import { useHallStore } from "../../../store/halls"
import { useHallSeats } from "../../../store/hallsSeats"
import { usePopup } from "../../../store/popup";
import { ErrorNotification, MessageNotification } from "../../../Notification"

const HallManage: FC = () => {
  const { halls, fetchDataHallSeats, deleteHall, delHall, error, message, clearNotifications } = useHallStore()
  const { deleteHallSeats } = useHallSeats();
  const { popupConfigOpen } = usePopup();

  useEffect(()=> {
    fetchDataHallSeats()
  }, [delHall])

  const openPopup = () => {
    popupConfigOpen('popupHallManage');
  };

  const closeNotification = () => {
    clearNotifications();
  };
  
  return (
    <>
      <section className="conf-step">
        <Header title={true} h2="Управление залами" />
        <div className="conf-step__wrapper">
          <p className="conf-step__paragraph">Доступные залы:</p>
          <ul className="conf-step__list">
            {
              halls.map(hall => (
                <Hall
                  key={hall.id}
                  name={hall.hall_title}
                  id={hall.id}
                  deleteHall={deleteHall}
                  deleteHallSeats={deleteHallSeats}
                />
              ))
            }
          </ul>
          {error && <ErrorNotification message={error} onClose={closeNotification} />}
          {message && <MessageNotification message={message} onClose={closeNotification} />}

          <button onClick={openPopup} className="conf-step__button conf-step__button-accent">Создать зал</button>
        </div>
      </section>
    </>
  );
}
export default HallManage;