# Проек "Кинотеатр"
Этот проект — приложение на React с использованием TypeScript, которое собирается с помощью Vite.

## Содержание
* **diplom_client** - фронтэнд приложения;
* **diplom_admin** - бэкэнд приложения.
* 
## Требования
- **Node.js** (рекомендуемая версия: >= 14.18.0)
- **npm** (рекомендуемая версия: >= 6.14.15)
- **git** (рекомендуемая версия: 2.47.0.windows.2)

## Установка для diplom_client
1. Откройте директорию, в ней запустите командную строку и введите:
   ```bash
   git clone https://github.com/Summer20100/diplom_client
1. Перейдите в папку проекта:
   ```bash
   cd diplom_client
1. Установите зависимости:
   ```bash
   npm install
## Скрипты
1. Запуск в режиме разработки:
   ```bash
   npm run dev
  Этот скрипт запускает Vite-сервер разработки, доступный по адресу http://localhost:5173.

2. Сборка для продакшена:
   ```bash
   npm run build
  Этот скрипт компилирует TypeScript и создает оптимизированную сборку для продакшена в папке dist.

3. Предпросмотр продакшн-сборки:
   ```bash
   npm run preview
  Этот скрипт позволяет локально протестировать собранное приложение из папки dist.

## Технические особенности
* React и React-DOM версии 18.2.0 — основная библиотека для построения интерфейсов.
* TypeScript — для типизации, что снижает количество ошибок на стадии разработки и повышает читаемость кода.
* Vite — обеспечивает быструю сборку и обновление при изменениях в режиме разработки.
* React Router v6 — для организации маршрутизации и навигации в приложении.
* zustand — библиотека для управления состоянием.
* axios — для выполнения HTTP-запросов.
* html2canvas и jsPDF — для создания PDF из HTML-контента.

## Зависимости
### devDependencies
* @vitejs/plugin-react — поддержка React в Vite.
* @types/react и @types/react-dom — типы для React и ReactDOM, необходимые для работы с TypeScript.

### dependencies
* axios — клиент для HTTP-запросов.
* html2canvas и jsPDF — для создания PDF-файлов.
* zustand — для управления состоянием.

## Лицензия
Проект распространяется под лицензией ISC.

## Установка для diplom_server

1. Откройте директорию, в ней запустите командную строку и введите:
   ```bash
   git clone https://github.com/Summer20100/diplom_server
1. Перейдите в папку проекта:
   ```bash
   cd diplom_server
1. Установите зависимости:
   ```bash
   npm install
## Скрипты
1. Запуск в режиме разработки:
   ```bash
   npm run dev
  Этот скрипт запускает сервер, доступный по адресу http://localhost:3001

## Технические особенности
1. Установите PostgreSQL на ваш компьютер;
2. Создайте БД для подключения:
   `user: 'postgres',
   password: 'root',
   host: 'localhost',
   port: 5432,
   database: 'cinema',`
* Создайте таблицы в БД:
   ```sql
   CREATE TABLE IF NOT EXISTS halls (
      id SERIAL PRIMARY KEY, 
      hall_title VARCHAR(255) UNIQUE NOT NULL
   );
   
   CREATE TABLE IF NOT EXISTS films (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      origin VARCHAR(100) NOT NULL,
      release_date INT NOT NULL,
      poster_title VARCHAR(255) NOT NULL,
      synopsis TEXT NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      duration INT NOT NULL,
      for_registration BOOLEAN DEFAULT false
   );

   CREATE TABLE IF NOT EXISTS chair_types (
      id SERIAL PRIMARY KEY, 
      "type" VARCHAR(255) UNIQUE NOT NULL
   );

   CREATE TABLE IF NOT EXISTS hall_chairs (
      id_seat INT NOT NULL,
      hall_id INT NOT NULL,
      FOREIGN KEY (hall_id) REFERENCES halls (id),
      hall_title VARCHAR(50) NOT NULL,
      row_number INT NOT NULL,
      seat_number INT NOT NULL,
      chair_type VARCHAR(50) NOT NULL,
      price DECIMAL(10, 2) NOT NULL
   );

   CREATE TABLE IF NOT EXISTS sessions (
      id SERIAL PRIMARY KEY,
      hall_id INT NOT NULL,
      FOREIGN KEY (hall_id) REFERENCES halls (id),
      hall_title VARCHAR(20) NOT NULL,
      session_date DATE NOT NULL,
      session_start TIME NOT NULL,
      session_finish TIME NOT NULL,
      film_id INT NULL
   );

   CREATE TABLE IF NOT EXISTS hall_chairs_of_session (
      id_seat INT NOT NULL,
      hall_id INT NOT NULL,
      FOREIGN KEY (hall_id) REFERENCES halls (id),
      hall_title VARCHAR(50) NOT NULL,
      row_number INT NOT NULL,
      seat_number INT NOT NULL,
      chair_type VARCHAR(50) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      session_id INT NOT NULL,
      FOREIGN KEY (session_id) REFERENCES sessions (id),
      check_is_buying BOOLEAN DEFAULT false
   );

## Скрипты
* start: Запускает сервер с помощью node server.js.
* dev: Запускает сервер с nodemon, что позволяет автоматически перезапускать сервер при изменении файлов.
* test: Заглушка для тестов (в настоящее время не реализовано).


## Зависимости
* express: Быстрый и минималистичный веб-фреймворк для Node.js.
* pg: Клиент для PostgreSQL на Node.js.
* dotenv: Загрузка переменных окружения из файла .env.
* cors: Разрешает кросс-доменные запросы.
* qrcode: Генерация QR-кодов.
* generate-gitignore: Помогает создать файл .gitignore для проекта.

## Зависимости для разработки
* nodemon: Утилита, отслеживающая изменения в файлах и автоматически перезапускающая сервер.

## Endpoips для подключений
## API SERVER

ttp://localhost:3001

## FOR CHEARS
#### GET ALL TYPES
ttp://localhost:3001/api/chair
#### GET ONE BY ID
ttp://localhost:3001/api/chair/:id

## FOR HALLS
#### POST HALL
ttp://localhost:3001/api/hall  
In request body use  
{  
  "hall_title": "name_hall"  
}
#### GET ALL HALLS
ttp://localhost:3001/api/hall
#### GET HALL BY ID
ttp://localhost:3001/api/hall/:id
#### DELETE HALL BY ID
ttp://localhost:3001/api/hall/:id

## FOR CHEARS OF HALLS
#### POST CHEARS OF HALL
ttp://localhost:3001/api/hallchairs
In request body use array:  
[  
  {  
    "id_seat": id_seat,  
    "hall_id": hall_id,  
    "hall_title": "hall_title",  
    "row_number": row_number,  
    "seat_number": seat_number,  
    "chair_type": "chair_type",  
    "price": 500,  
  }  
]  
#### GET ALL CHEARS HALLS
ttp://localhost:3001/api/hallchairs
#### GET ALL CHEARS OF HALL BY ID
ttp://localhost:3001/api/hallchairs/:id
#### UPDATE TYPE OF CHEAR OF HALL BY NUMBER OF CHAIR
ttp://localhost:3001/api/hallchairs/:id?seat="seat"  
Use id like req.params.id  
Use id_seat like req.query.id_seat  
Use chair_type like req.body.chair_type  
#### Example Request:  
To update the price of a hall chair with an ID of 82 and a type of vip:  
URL: ttp://localhost:3001/api/hallchairs/82?seat=4  
Body: { "chair_type": "vip" }
#### UPDATE PRICE CHEARS OF HALL BY TYPES
ttp://localhost:3001/api/hallchairs/:id?type="type"  
Use id like req.params.id  
Use type like req.query.type  
Use price like req.body.price  
#### Example Request:  
To update the price of a hall chair with an ID of 82 and a type of vip:  
URL: ttp://localhost:3001/api/hallchairs/82?type=vip  
Body: { "price": 150 }
#### DELETE CHEARS OF HALL BY ID
ttp://localhost:3001/api/hallchairs/:id  


## FOR SESSIONS
#### GET ALL SESSIONS
ttp://localhost:3001/api/sessions  
#### GET SESSION BY ID SESSION
ttp://localhost:3001/api/sessions/:id  
#### GET ALL SESSION BY ID HALL
ttp://localhost:3001/api/sessions/hall/:id  
#### POST SESSION
ttp://localhost:3001/api/sessions  
In request body use array:  
[  
  {  
    "hall_id": hall_id,  
    "hall_title": hall_title,  
    "session_date": session_date,  
    "session_start": session_start,  
    "session_finish": session_finish  
  }  
]  
#### UPDATE SESSION
ttp://localhost:3001/api/session/:id  
Use id like req.params.id  
In request body use object:  
  {  
    "hall_id": hall_id,  
    "hall_title": hall_title,  
    "session_date": session_date,  
    "session_start": session_start,  
    "session_finish": session_finish  
  }  

#### DELETE SESSION BY ID SESSION
ttp://localhost:3001/api/session/:id  
