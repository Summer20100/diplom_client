import React from 'react';
import { usePopup } from '../../store/popup';

interface PopupProps {
  isOpen: boolean;
  title: string;
  posterImage: string;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, title, posterImage, children }) => {
  const { popupHallConfigClose, popupIsClose, hallsSeat, popupIsOpen } = usePopup();
  console.log(hallsSeat)
  return (
    <div className={`popup ${isOpen ? 'active' : ''}`}>
      <div className="popup__content">
        <div className="popup__header">
          <h2 className="popup__title">{title}</h2>
          <button className="popup__dismiss" onClick={popupHallConfigClose}>
            <img src="./img/admin/close-icon.png" alt="Close" />
          </button>
        </div>
        <div className="popup__wrapper">
          <div className="popup__container">
            <div className="popup__poster" style={{ backgroundImage: `url(${posterImage})` }}></div>
            <form className="popup__form">
              {children}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
