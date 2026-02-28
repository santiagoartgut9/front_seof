import React, { useState } from 'react';
import { userService } from '../services/api';
import './Auth.css';

const Auth = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const response = await userService.login(formData.username, formData.password);
        if (response.data.success) {
          localStorage.setItem('user', JSON.stringify(response.data.data));
          onLoginSuccess(response.data.data);
        }
      } else {
        const response = await userService.register(
          formData.username,
          formData.email,
          formData.password,
          formData.fullName
        );
        if (response.data.success) {
          setError('¡Registro exitoso! Ahora inicia sesión.');
          setTimeout(() => {
            setIsLogin(true);
            setFormData({ username: '', email: '', password: '', fullName: '' });
          }, 2000);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error en la operación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🛍️ E-Commerce Monolito</h1>
        <h2>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>

        {error && <div className={`message ${isLogin && error.includes('exitoso') ? 'success' : 'error'}`}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={formData.username}
            onChange={handleChange}
            required
          />

          {!isLogin && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="fullName"
                placeholder="Nombre Completo"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Procesando...' : isLogin ? 'Ingresar' : 'Registrarse'}
          </button>
        </form>

        <p className="toggle-auth">
          {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <span onClick={() => {
            setIsLogin(!isLogin);
            setFormData({ username: '', email: '', password: '', fullName: '' });
            setError('');
          }}>
            {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
