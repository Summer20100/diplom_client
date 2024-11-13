import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../store/auth";

const Header: FC = () => {
  const { logout } = useAuth();
  const backToLogin = () => {
    logout();
    window.location.reload();
  };

  return (
    <>
      <header className="page-header">
        <Link to="/client" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <h1 className="page-header__title" style={{ cursor: 'pointer', userSelect: 'none' }}>
            Идём<span>в</span>кино
          </h1>
        </Link>
        <button onClick={backToLogin}>ВЫХОД</button>
      </header>
    </>
  );
};

export default Header;
