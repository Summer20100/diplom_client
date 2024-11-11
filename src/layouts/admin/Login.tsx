import conf from '../configurations/conf';
import { useEffect, FC, useState } from 'react';
import { useAuth } from "../store/auth"
import Header from './components/Header';

import './CSS/normalize.css';
import './CSS/styles.css';

export const Login: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { documentTitle } = conf;
  const { login } = useAuth();

  const onSubmit = (e: any) => {
    e.preventDefault();
    // console.log({ 'email': email, 'pass': password })
    login(email, password);
  }

  useEffect(() => {
    documentTitle('Авторизация | ИдёмВКино');
  }, [])

  return (
    <body className='admin'>
      <Header title={true} subtitle={true} />
      <main>
        <section className="login">
          <header className="login__header">
            <h2 className="login__title">Авторизация</h2>
          </header>
          <div className="login__wrapper">
            <form onSubmit={(e) => onSubmit(e)} className="login__form">
              <label className="login__label" htmlFor="email">
                E-mail
                <input 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="login__input" 
                  // type="email" 
                  type="text" 
                  placeholder="example@domain.xyz" 
                  value={email}
                  // name="email" 
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
                  // name="password" 
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
}

export default Login;