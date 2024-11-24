import { FC, useEffect, useState } from "react";
import { useFilmsStore } from "../../store/films" ;
import { IMovieInfo } from "../../models/IMovieDate";
import { ErrorNotification, MessageNotification } from "../../Notification";


const FilmRegistration: FC = () => {
  const { 
    films, 
    updateFilm,
    clearNotifications,
    saleStatus,
    message
   } = useFilmsStore();

  const [filmForUpdate, setFilmForUpdate] = useState<IMovieInfo | null>(null);

  const handleSelectChange = (e: any) => {
    const film = JSON.parse(e.target.value)
    setFilmForUpdate(film)
  };


  const regBtn = async (ev: any) => {
    if (filmForUpdate) {
      try {
        await updateFilm({ ...filmForUpdate, for_registration: ev });
      } catch (error) {
        console.error("Error updating film:", error);
      }
    } else {
      console.error("No film selected for update");
    }
  };
  // console.log(message)
  
  return (
    <>
      <fieldset className="conf-step__buttons">
        <select
          id="options"
          name="options"
          onChange={(ev => handleSelectChange(ev))}
          style={{ width: "100%"}}
        >
          <option value="null">Выберите фильм...</option>
          {films && 
          films.map((film, index) => (
            <option
              value={JSON.stringify(film)}
              key={film.id || index}
            >
              {film.poster_title}
            </option>
          ))}
        </select>

        <button 
          className="conf-step__button conf-step__button-regular" 
          onClick={() => regBtn(false)}
          style={{ width: "100%"}}
        >Закрыть продажу билетов</button>
        <input 
          type="submit" 
          value="Открыть продажу билетов" 
          style={{ width: "100%"}}
          className="conf-step__button conf-step__button-accent" 
          onClick={() => regBtn(true)}
        />
      </fieldset>
      { saleStatus &&  
        <MessageNotification 
          message={saleStatus} 
          onClose={() => clearNotifications()}
        /> 
      }
    </>
  );
};

export default FilmRegistration;
