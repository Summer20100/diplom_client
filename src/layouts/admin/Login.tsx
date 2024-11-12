import conf from '../configurations/conf';
import { useEffect, FC, useState } from 'react';
import { useAuth } from "../store/auth";
import { useUser } from "../store/users";
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';

import './CSS/normalize.css';
import './CSS/styles.css';

export const Login: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { documentTitle } = conf;
  const { login, token, user, isAuth } = useAuth();
  const { getUsers, setUsers, isValid } = useUser();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    await getUsers();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setUsers([]);
  };

  useEffect(() => {
    documentTitle('Авторизация | ИдёмВКино');
  }, []);

  useEffect(() => {
    if (token) {
      getUsers();
    }
  }, [token]);

  // console.log(user?.roles.find(el => el === "USER") || null)

  useEffect(() => {
    if (isValid) {
      // if (user?.roles.includes("ADMIN")) {
        navigate('/admin');
      // } else if (user?.roles.includes("USER")) {
        // navigate('/client');
      // }
    }
  }, [isValid, navigate, user]);

  return (
    <body className='admin'>
      <Header title={true} subtitle={true} />
      <main>
        <section className="login">
          <header className="login__header">
            <h2 className="login__title">Авторизация</h2>
          </header>
          <div className="login__wrapper">
            <form onSubmit={onSubmit} className="login__form">
              <label className="login__label" htmlFor="email">
                E-mail
                <input 
                  onChange={handleEmailChange} 
                  className="login__input" 
                  type="text" 
                  placeholder="example@domain.xyz" 
                  value={email}
                  required 
                />
              </label>
              <label className="login__label" htmlFor="pwd">
                Пароль
                <input 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="login__input" 
                  type="password" 
                  placeholder="" 
                  value={password}
                  name="password"
                  required 
                />
              </label>
              <div className="text-center">
                <input value="Авторизоваться" type="submit" className="login__button" />
              </div>
            </form>
          </div>
        </section>
      </main>

      <script src="js/accordeon.js"></script>
    </body>
  );
};

export default Login;
