# Проект "Кинотеатр"
Этот проект — приложение на React с использованием TypeScript, которое собирается с помощью Vite.

## Содержание
* **diplom_client** - фронтэнд приложения;
* **diplom_admin** - бэкэнд приложения.
* 
## Требования
- **Node.js** (рекомендуемая версия: >= 14.18.0)
- **npm** (рекомендуемая версия: >= 6.14.15)
- **git** (рекомендуемая версия: 2.47.0.windows.2)


# Установка для diplom_client
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
  Этот скрипт запускает Vite-сервер разработки, доступный по различным адресам.
  
  Необходимо запускать приложение на http://localhost:5173

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

# Установка для diplom_server

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
2. Установите Postman для работы с БД через REST API
2. Создайте БД для подключения;
3. Создайте набор типов кресел, ролей пользователей, и самих пользователей
### Подключение к базе данных
Для подключения к базе данных PostgreSQL с использованием следующих настроек, убедитесь, что у вас установлен PostgreSQL и настроено подключение к серверу.
### Настройки подключения:
- **Пользователь**: `postgres`
- **Пароль**: `root`
- **Хост**: `localhost`
- **Порт**: `5432`
- **База данных**: `cinema`

### Скрипты для создания таблиц

```sql
-- Таблица для залов
CREATE TABLE IF NOT EXISTS halls (
   id SERIAL PRIMARY KEY, 
   hall_title VARCHAR(255) UNIQUE NOT NULL
);

-- Таблица для фильмов
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

-- Таблица для типов кресел
CREATE TABLE IF NOT EXISTS chair_types (
   id SERIAL PRIMARY KEY, 
   "type" VARCHAR(255) UNIQUE NOT NULL
);

-- Таблица для кресел в залах
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

-- Таблица для сеансов
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

-- Таблица для кресел на сеансах
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

-- Таблица для ролей пользователей
CREATE TABLE IF NOT EXISTS "role" (
   "value" VARCHAR(255) UNIQUE NOT NULL DEFAULT 'USER'
);

-- Таблица для пользователей
CREATE TABLE IF NOT EXISTS "user" (
   username VARCHAR(255) UNIQUE NOT NULL,
   "password" VARCHAR(255) NOT NULL
);

-- Таблица для пользователей с массивом ролей
CREATE TABLE IF NOT EXISTS user_role (
   username VARCHAR(255) REFERENCES "user"(username) ON DELETE CASCADE,
   "roles" VARCHAR(255) REFERENCES "role"("value") ON DELETE CASCADE,
   PRIMARY KEY (username, "roles")
);
```
### Скрипты для создания типов кресел
```sql
INSERT INTO chair_types ("type") VALUES 
  ("vip"),
  ("standart"),
  ("disabled");
```

### Скрипты для создания типов ролей пользователей
```sql
INSERT INTO "role" ("value") VALUES 
   ("ADMIN"),
   ("CLIENT");
```

### REST API для создания типов пользователей
Доступно три пипа доступа пользователей:
1. ___**Доступ к клиентской части:**___ 

Запрос REST API типа **post**
```
http://localhost:3001/api/auth/registration
```
Объект
```
{
   "username" : "user",
   "password" : "user"
}
```
2. ___**Доступ к административной части:**___

Запрос REST API типа **post**
```
http://localhost:3001/api/auth/registration
```
Объект
```
{
   "username" : "admin",
   "password" : "admin"
}
```
По умолчанию при создании пользователя назначается роль "CLIENT". Надо заменить её на "ADMIN"

* Добавляем роль "ADMIN"
Запрос REST API типа **put**
```
http://localhost:3001/api/auth/usersroles/admin
```
Объект
```
{
   "role" : "ADMIN"
}
```
* Удаляем роль "CLIENT"

Запрос REST API типа **delete**
```
http://localhost:3001/api/auth/api/usersroles/admin
```
Объект
```
{
   "role" : "CLIENT"
}
```

3. ___**Доступ к клиентской и административной частям:**___

Запрос REST API типа **post**
```
http://localhost:3001/api/auth/registration
```
Объект
```
{
   "username" : "superadmin",
   "password" : "superadmin"
}
```
Добавляем роль "ADMIN"

Запрос REST API типа **put**
```
http://localhost:3001/api/auth/usersroles/admin
```
Объект
```
{
   "role" : "ADMIN"
}
```

## Скрипты серверной части приложения
* start: Запускает сервер с помощью node server.js.
* dev: Запускает сервер с nodemon, что позволяет автоматически перезапускать сервер при изменении файлов.
* test: Заглушка для тестов (в настоящее время не реализовано).


## Зависимости
* express: Быстрый и минималистичный веб-фреймворк для Node.js.
* pg: Клиент для PostgreSQL на Node.js.
* cors: Разрешает кросс-доменные запросы.
* qrcode: Генерация QR-кодов.
