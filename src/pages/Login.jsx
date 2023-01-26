
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login({ onLogin, users, setUsers, user, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function isUser() {
    return users.find((item) => item.email === email && item.password === password);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user, users)
    if (isUser({ email, password })) {
      setError('Успешно');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="login">
      <h1>Вход</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login__container">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button onClick={onLogin} type="submit">Войти</button>
      </form>
      <p>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </p>
    </div>
  );
}

export default Login;

