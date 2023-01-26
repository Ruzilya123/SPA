
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Registration.css';
import { useNavigate } from 'react-router-dom';

function Register({ users, setUsers, user, setUser }) {
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [register, setRegister] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  function onEmailChange(e) {
    setEmail(e.target.value);
    setEmailIsValid(validateEmail(e.target.value));
  }

  const isUser = () => users.find((item) => item.email === email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user) {
      setError('Вы уже зарегистрированы');
      return;
    }

    if (isUser({ email })) {
      setError('Пользователь с таким email уже существует');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    else {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      setUser({ email, password });
      setUsers([...users, { email, password }]);
      localStorage.setItem('users', JSON.stringify({users: users}));
      console.log(users);
      setError('Успешно');
      navigate('/login');
    }
  };

  return (
    <div className="registration">
      <h1 className="registration__form-title">Регистрация</h1>
      <form className="registration__form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="registration__form-input"
            type="email"
            id="email"
            value={email}
            onChange={onEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            className="registration__form-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Подтвердите пароль</label>
          <input
            className="registration__form-input"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button className="registration__form-button" type="submit">Зарегистрироваться</button>
      </form>
      <p>
        Уже есть аккаунт? <Link className="registration__form-link" to="/login">Войти</Link>
      </p>
    </div>
  );
}

export default Register;