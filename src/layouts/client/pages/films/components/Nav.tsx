import { FC, useMemo, useState, useEffect } from "react";

interface INav {
  date: string;
  getDate: (date: string | null) => void;
  ind: number;
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
}

export const Nav: FC<INav> = ({ date, getDate, ind, selectedIndex, setSelectedIndex }) => {
  const formattedDate = useMemo(() => {
    function formatDate(dateString: string) {
      const date = new Date(dateString);
  
      if (isNaN(date.getTime())) {
        return { dayOfWeek: 'N/A', dayOfMonth: 'N/A', isWeekend: false };
      }
  
      const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
      const dayOfWeek = daysOfWeek[date.getUTCDay()];
      const dayOfMonth = date.getUTCDate();
      const isWeekend = dayOfWeek === 'Сб' || dayOfWeek === 'Вс';
  
      return { dayOfWeek, dayOfMonth, isWeekend };
    }
    return formatDate(date);
  }, [date]);

  function getCurrentDate(dates: string | null = null) {
    const date = dates ? new Date(dates) : new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}.${month}.${year}`;
  }
  
  const [newClassName, setNewClassName] = useState<string>('')

  const handleActive = (ev: React.MouseEvent) => {
    ev.preventDefault();
    getDate(date);
    setSelectedIndex(ind);
  };

  useEffect(() => {
    let className = 'page-nav__day'; 
    if (selectedIndex === ind) {
      className += ' page-nav__day_chosen';
    } else if (getCurrentDate() === getCurrentDate(date)) {
      className += ' page-nav__day_today page-nav__day_chosen';
      getDate(date);
    } else if (formattedDate.isWeekend) {
      className += ' page-nav__day_weekend';
    } 
    setNewClassName(className);
  }, [date, selectedIndex, ind, formattedDate.isWeekend]);
  
  return (
    <a
      className={newClassName}
      onClick={handleActive}
    >
      <span className="page-nav__day-week">{formattedDate.dayOfWeek}</span>
      <span className="page-nav__day-number">{formattedDate.dayOfMonth}</span>
    </a>
  );
};

export default Nav;
