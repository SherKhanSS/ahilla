// import { useRouter } from 'next/router';
import { FC, FormEvent, useRef } from 'react';
import styles from './login.module.scss';
import { useHttp } from '../../hooks/http';

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const placeholders = {
  email: `ahilla@ahilla.ru`,
  password: `qwerty`,
};

const LogIn: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  // const router = useRouter();
  const { request } = useHttp();

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    const loginData = {
      email: formRef?.current?.username.value,
      password: formRef?.current?.password.value,
    };

    try {
      // путь для регистрации пользователя с правами админа
      // await request(`${domainURL}/api/auth/registration`, 'POST', loginData);

      const response = await request(
        `${domainURL}/api/auth/login`,
        'POST',
        loginData
      );
      if (response.token) {
        document.cookie = `token=${response.token}`;
        localStorage.setItem('token', response.token as string);
        // await router.push('/administration/private');
        return window.location.assign('/administration/private');
      }
      alert('Неверные данные для входа!');
    } catch (err) {
      alert('Неверные данные для входа!');
    }
  };

  return (
    <section className={styles.login}>
      <div className={styles.login__wrap}>
        <h2>Вход</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className={styles.login__form_wrap}>
            <label>
              Логин
              <input
                required
                type="email"
                placeholder={placeholders.email}
                name="username"
              />
            </label>
            <label>
              Пароль
              <input
                required
                type="password"
                placeholder={placeholders.password}
                name="password"
              />
            </label>
            <button>Войти</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
