import { display } from 'html2canvas/dist/types/css/property-descriptors/display';
import React, { useState, useEffect } from 'react';

interface NotificationProps {
  message: string | { msg: string }[];
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
      paddingTop: '8px',
      paddingRight: '8px',
      paddingLeft: '8px',
      boxSizing: 'border-box' as const,
      margin: '8px 0',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'flex-start',
      maxWidth: '100%',
      backgroundColor: type === 'error' ? '#f8d7da' : '#d1ecf1',
      color: type === 'error' ? '#721c24' : '#0c5460',
      border: type === 'error' ? '1px solid #fc031d' : '1px solid #00ff00',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 1s ease-out',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px',
    },
    icon: {
      marginRight: '8px',
      marginBottom: '0',
    },
    messageText: {
      flexGrow: 1,
      marginBottom: '0',
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
  
  if (Array.isArray(message)) {
    return (
      <div style={styles.container} onClick={onClose}>
        {message.map((el, index) => (
          <div key={index} style={styles.item}>
            <span style={styles.icon}>{type === 'error' ? '❌' : 'ℹ️'}</span>
            <span style={styles.messageText}>{el.msg}</span>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div style={styles.container} onClick={onClose}>
      <div style={styles.item}>
        <span style={styles.icon}>{type === 'error' ? '❌' : 'ℹ️'}</span>
        <span style={styles.messageText}>{message}</span>
      </div>
    </div>
  );
};

export const ErrorNotification: React.FC<Omit<NotificationProps, 'type'>> = (props) => (
  <Notification {...props} type="error" />
);

export const MessageNotification: React.FC<Omit<NotificationProps, 'type'>> = (props) => (
  <Notification {...props} type="message" />
);
