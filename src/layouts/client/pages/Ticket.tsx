import { FC, useEffect, useState, Fragment } from "react";
import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useQRCode } from "../../store/qrcode";
import { IQRCode } from "../../models/IQRCode"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../css/styles01.css';
import '../css/normalize01.css';

export const Payment: FC = () => {
  const qrRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [paymentData, setPaymentData] = useState<IQRCode | null>(null);

  const dataParam = queryParams.get('data');

  useEffect(() => {
    if (dataParam) {
      try {
        setPaymentData(JSON.parse(dataParam));
      } catch (error) {
        console.error('Ошибка при парсинге paymentData:', error);
      }
    }
  }, [dataParam]);

  const { generateQRCode, qrcode } = useQRCode();

  useEffect(() => {
    if (paymentData) {
      generateQRCode(paymentData);
    }
  }, [paymentData]);

  const printQRCode = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && qrRef.current) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Печать QR-кода</title>
            <style>
              body { display: flex; justify-content: center; align-items: center; height: 100vh; }
              img { max-width: 100%; height: auto; }
            </style>
          </head>
          <body>
            <div class="ticket__info-wrapper">
              ${qrRef.current.innerHTML}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    } else {
      console.error('Print window could not be opened or qrRef.current is null');
    }
  };

  const downloadPDF = () => {
    if (qrRef.current) {
      html2canvas(qrRef.current).then(canvas => {
        const pdf = new jsPDF('p', 'pt', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 500;
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const margin = 50;
        let heightLeft = imgHeight;
  
        let position = margin; 
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight + margin;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save('qr-code.pdf');
      });
    }
  };

  return (
    <>
      <main>
        <section className="ticket">
          <header className="ticket__check">
            <h2 className="ticket__check-title">Электронный билет</h2>
          </header>
          <div className="ticket__info-wrapper">
            <div ref={qrRef}>
              {Array.isArray(paymentData) && paymentData.length > 0 ? (
                <>
                  <p className="ticket__info">На фильм:
                    <span className="ticket__details ticket__title" style={{ margin: '0 5px' }}>
                      {paymentData[0]?.title || 'Нет данных о фильме'}
                    </span>
                  </p>
                  <p className="ticket__info">Места:
                    <span className="ticket__details ticket__chairs" style={{ margin: '0 5px' }}>
                      {paymentData.map((seat: IQRCode, index: number) => (
                        <Fragment key={seat.id_seat}>
                          {seat.id_seat}
                          {index < paymentData.length - 1 && ", "}
                        </Fragment>
                      ))}
                    </span>
                  </p>
                  <p className="ticket__info">В зале:
                    <span className="ticket__details ticket__hall" style={{ margin: '0 5px', textTransform: "uppercase" }}>
                      {paymentData[0]?.hall_title || 'Нет данных о зале'}
                    </span>
                  </p>
                  <p className="ticket__info">Начало сеанса:
                    <span className="ticket__details ticket__start" style={{ margin: '0 5px' }}>
                      {paymentData[0]?.session_start.slice(0, 5) || 'Нет данных о времени'}
                    </span>
                  </p>
                  {qrcode
                    ? <img src={qrcode} alt="QR Code" className="ticket__info-qr" />
                    : <p className="ticket__info-qr">Генерация QR Code...</p>
                  }
                </>
              ) : (
                <p className="ticket__info-qr">Loading payment data...</p>
              )}
            </div>
            <button className="acceptin-button" onClick={printQRCode}>распечатать QR-код</button>
            <button className="acceptin-button" onClick={downloadPDF}>скачать QR-код</button>
            <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
            <p className="ticket__hint">Приятного просмотра!</p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Payment;
