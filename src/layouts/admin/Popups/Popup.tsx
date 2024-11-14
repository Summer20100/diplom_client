import React, { useRef, useEffect } from 'react';
import { usePopup } from '../../store/popup';

interface PopupProps {
  title: string;
  posterImage: string;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ title, posterImage, children }) => {
  const { popupConfigClose, popupIsOpen } = usePopup();
  const popupRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        popupConfigClose();
      }
    };

    if (popupIsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupIsOpen, popupConfigClose]);

  return (
    <div className={`popup ${popupIsOpen ? 'active' : ''}`}>
      <div className="popup__content" ref={popupRef}>
        <div className="popup__header">
          <h2 className="popup__title">{title}</h2>
          <button className="popup__dismiss" onClick={popupConfigClose}>
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
