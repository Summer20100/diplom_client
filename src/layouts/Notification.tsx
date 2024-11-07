import React, { useState, useEffect } from 'react';

interface NotificationProps {
  message: string;
  onClose: () => void;
  type: 'error' | 'message';
}

const Notification: React.FC<NotificationProps> = ({ message, onClose, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    container: {
      padding: '10px',
      boxSizing: 'border-box' as 'border-box',
      margin: '8px 0',
      borderRadius: '4px',
      fontSize: '10px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: '100%',
      backgroundColor: type === 'error' ? '#f8d7da' : '#d1ecf1',
      color: type === 'error' ? '#721c24' : '#0c5460',
      border: type === 'error' ? '1px solid #fc031d' : '1px solid #00ff00',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 1s ease-out',
    },
    icon: {
      marginRight: '8px',
    },
    messageText: {
      flexGrow: 1,
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      color: 'inherit',
      transition: 'color 0.3s ease',
    },
  };

  return (
    <div style={styles.container} onClick={onClose}>
      <span style={styles.icon}>{type === 'error' ? '❌' : 'ℹ️'}</span>
      <span style={styles.messageText}>{message}</span>
    </div>
  );
};

export const ErrorNotification: React.FC<Omit<NotificationProps, 'type'>> = (props) => (
  <Notification {...props} type="error" />
);

export const MessageNotification: React.FC<Omit<NotificationProps, 'type'>> = (props) => (
  <Notification {...props} type="message" />
);
