import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axios';
import { AxiosError } from 'axios';

export default function Login() {

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navegate = useNavigate();

  const handleSubmit = useCallback( async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/login', {
        nome: login,
        senha,
      })

      const token = response.data.token

      localStorage.setItem('token', token)

      navegate('/')

    } catch (error) {
      let message;
      message = error instanceof AxiosError ? error.response.data.error.message : error.message
      setError( message || 'Falha ao logar')
      console.log(message)
    }

  }, [login, senha])

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor='login'>Login</label>
            <input
              id='login'
              type='text'
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
        </div>
        <div>
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
