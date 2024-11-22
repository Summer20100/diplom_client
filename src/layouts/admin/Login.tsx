import conf from '../configurations/conf';
import { useEffect, FC, useState } from 'react';
import { useAuth } from "../store/auth";
import { useUser } from "../store/users";
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import api from '../http/index';

import './CSS/normalize.css';
import './CSS/styles.css';

export const Login: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login, token, user, isAuth, fetchUserInfo } = useAuth();
  const { getUsers, setUsers, isValid } = useUser();
  const [roles, setRoles] = useState<string | null>(localStorage.getItem('roles'));

  useEffect(() => {
    if (token) {
      getUsers();
    }
  }, [token]);

  useEffect(() => {
    if (isValid && roles) {
      navigate(roles === 'ADMIN' ? '/admin' : '/client');
    }
  }, [isValid, roles, navigate]);

  useEffect(() => {
    const handleStorageChange = () => {
      setRoles(localStorage.getItem('roles'));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    await getUsers();
    setRoles(localStorage.getItem('roles'));

    if (localStorage.getItem('roles')?.includes('ADMIN')) {
      navigate('/admin');
    } else if (localStorage.getItem('roles')?.includes('CLIENT')) {
      navigate('/client');
    } else if (!localStorage.getItem('roles')) {
      navigate('/');
    };
    window.location.reload();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setUsers([]);
    fetchUserInfo(null);
  };

  return (
    <body className='admin'>
      <Header title={true} subtitle={true} page="login"/>
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
                  autoComplete="username"
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
                  autoComplete="password"
                />
              </label>
              <div className="text-center">
                <input value="Авторизоваться" type="submit" className="login__button" />
              </div>
            </form>
          </div>
        </section>
      </main>
    </body>
  );
};

export default Login;
