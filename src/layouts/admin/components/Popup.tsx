import React from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  posterImage: string;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, title, posterImage, children }) => {
  return (
    <div className={`popup ${isOpen ? 'active' : ''}`}>
      <div className="popup__content">
        <div className="popup__header">
          <h2 className="popup__title">{title}</h2>
          <div className="popup__dismiss" onClick={onClose}>
            <img src="./img/admin/close-icon.png" alt="Close" />
          </div>
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
