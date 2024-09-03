import { FC, useEffect } from "react";
import Card from "./components/Card";
import Nav from "./components/Nav";
import { IMovieDate, IMovie } from '../../../models/IMovieDate'

import { useMovieStore } from '../../../store/store';
import { useFilmsStore } from '../../../store/films';
import Login from "../../../admin/Login";


// import '../css/styles.css';
// import '../css/normalize.css';

// const films: IMovieDate = 
//   [
//     {
//       "date": "2024-01-01",
//       "movie": [
//         {
//           "id": 125,
//           "title": "Альфа",
//           "image": "./img/client/poster2.jpg",
//           "synopsis": "20 тысяч лет назад Земля была холодным и неуютным местом, в котором смерть подстерегала человека на каждом шагу.",
//           "duration": 130,
//           "origin": "США",		
//           "hall" : [
//             {
//               "title": "HALL 1",
//               "time": ["11:30", "12:30"]
//             },
//             {
//               "title": "HALL 2",
//               "time": ["13:30", "14:30"]
//             },
//             {
//               "title": "HALL 3",
//               "time": ["15:30", "16:30"]
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "date": "2024-01-02",
//       "movie": [
//         {
//           "id": 125,
//           "title": "Альфа",
//           "image": "./img/client/poster2.jpg",
//           "synopsis": "./img/client/poster2.jpg",
//           "duration": 130,
//           "origin": "США",		
//           "hall" : [
//             {
//               "title": "HALL 1",
//               "time": ["15:30", "17:30"]
//             }
//           ]
//         }
//       ]
//     }
//   ]


export const Films = () => {
  const { data, fetchData } = useMovieStore();
  const { films, fetchDataFilms } = useFilmsStore();

  useEffect(() => {
    fetchData();
    fetchDataFilms()
  }, [fetchData, fetchDataFilms])

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const filmCards = data[0].movie.map((film: IMovie, ind: number) =>
    <Card key={ind} movie={film} />
  )
  
  return (
    <>
      <Nav />
      <main>
        { filmCards }
      </main>
    </>
  );
}

export default Films