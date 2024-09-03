import { FC } from 'react';

interface IHeader {
  title: boolean | string;
  subtitle?: boolean | string;
  h2?: string;
}

const Header: FC<IHeader> = ({ title, subtitle, h2 }) => {
  if (h2) {
    return (
      <header className="conf-step__header conf-step__header_opened">
        <h2 className="conf-step__title">{h2}</h2>
      </header>
    );
  } else {
    return (
      <header className="page-header">
        {title && subtitle
          ?
          <>
            <h1 className="page-header__title">Идём<span>в</span>кино</h1>
            <span className="page-header__subtitle">Администраторррская</span>
          </>
          :
          <h1 className="page-header__title">Идём<span>в</span>кино</h1>
        }
      </header>
    );
  }
}
export default Header;