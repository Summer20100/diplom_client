import { FC } from 'react';
import { Link } from 'react-router-dom';
import ButtonLogout from "../../ButtonLogout"

const Header: FC = () => {
  return (
    <>
      <header className="page-header">
        <Link to="/client" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <h1 className="page-header__title" style={{ cursor: 'pointer', userSelect: 'none' }}>
            Идём<span>в</span>кино
          </h1>
        </Link>
        <ButtonLogout />
      </header>
    </>
  );
};

export default Header;
