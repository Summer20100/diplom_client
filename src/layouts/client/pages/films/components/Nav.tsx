import { FC } from "react";

interface INav {
  date: string;
  getDate: (date: string | null) => void,
  ind: number
}

export const Nav: FC<INav> = ({ date, getDate, ind }) => {
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return { dayOfWeek: 'N/A', dayOfMonth: 'N/A' };
    }
    
    const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const dayOfMonth = date.getUTCDate();
    
    return { dayOfWeek, dayOfMonth };
  }

  const { dayOfWeek, dayOfMonth } = formatDate(date);

  const newClassName = ind === 1 ? "page-nav__day active" : "page-nav__day";

  return (
    <a className={newClassName} href="#" onClick={(e) => { e.preventDefault(); getDate(date); }}>
      <span className="page-nav__day-week">{ dayOfWeek || 'N/A' }</span>
      <span className="page-nav__day-number">{ dayOfMonth !== null ? dayOfMonth : 'N/A' }</span>
    </a>
  );
}

export default Nav;
