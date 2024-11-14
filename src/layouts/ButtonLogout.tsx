import { FC } from 'react';
import { useAuth } from "./store/auth";
import { useNavigate } from 'react-router-dom';

const ButtonLogout: FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const backToLogin = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <button onClick={backToLogin}>ВЫХОД</button>
  );
};

export default ButtonLogout;
