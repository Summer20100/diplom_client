import { useLocation, useNavigate } from 'react-router-dom';
import { useTickets } from "../../store/tickets";
import { Fragment, useEffect } from 'react';
import { IQRCode } from "../../models/IQRCode";

export const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let paymentData: IQRCode[] | null = null;
  const dataParam = queryParams.get('data');

  if (dataParam) {
    try {
      paymentData = JSON.parse(dataParam) as IQRCode[];
    } catch (error) {
      console.error('Ошибка при парсинге paymentData:', error);
    }
  }

  const { ticketsForBuying, updateTicketForBuying } = useTickets();

  const newQRCode = () => {
    if (paymentData && ticketsForBuying) {
      updateTicketForBuying(ticketsForBuying);
      const encodedPaymentData = encodeURIComponent(JSON.stringify(paymentData));
      navigate(`/client/ticket?data=${encodedPaymentData}`);
    }
  };

  const totalPrice = paymentData ? paymentData.reduce((sum: number, item: IQRCode) => {
    return sum + parseFloat(item.price);
  }, 0) : 0;

  return (
    <>
      <main>
        <section className="ticket">
          <header className="ticket__check">
            <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
          </header>
          <div className="ticket__info-wrapper">
            {paymentData && (
              <>
                <p className="ticket__info">На фильм:
                  <span className="ticket__details ticket__title" style={{ margin: '0 5px' }}>
                    {paymentData?.[0]?.title ?? 'Неизвестно'}
                  </span>
                </p>
                <p className="ticket__info">Места:
                  <span className="ticket__details ticket__chairs" style={{ margin: '0 5px' }}>
                    {paymentData?.map((seat: IQRCode, index: number) => (
                      <Fragment key={seat.id_seat}>
                        {seat.id_seat}
                        {index < (paymentData.length - 1) && ", "}
                      </Fragment>
                    ))}
                  </span>
                </p>
                <p className="ticket__info">В зале:
                  <span className="ticket__details ticket__hall" style={{ margin: '0 5px', textTransform: "uppercase" }}>
                    {paymentData?.[0]?.hall_title ?? 'Неизвестно'}
                  </span>
                </p>
                <p className="ticket__info">Начало сеанса:
                  <span className="ticket__details ticket__start" style={{ margin: '0 5px' }}>
                    {paymentData?.[0]?.session_start?.slice(0, 5) ?? 'Неизвестно'}
                  </span>
                </p>
                <p className="ticket__info">Стоимость:
                  <span className="ticket__details ticket__cost" style={{ margin: '0 5px' }}>
                    {totalPrice.toFixed(2)}
                  </span> рублей
                </p>
              </>
            )}
            <button className="acceptin-button" onClick={newQRCode}>
              Получить код бронирования
            </button>
            <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
            <p className="ticket__hint">Приятного просмотра!</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Payment;
