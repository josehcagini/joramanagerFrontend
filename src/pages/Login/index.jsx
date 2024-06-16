import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { get } from 'lodash';
import * as actions from '../../store/modules/auth/actions';
import getErrorMessage from '../../utils/getErrorMessage';
import MyForm from '../../components/MyForm';
import MyInput from '../../components/MyInput';

export default function Login(props) {

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const prevPath = get(props, 'location.state.prevPath', '/');


  const handleSubmit = useCallback( async (e) => {
    e.preventDefault();
    setError('');
    try {

      dispatch(actions.loginRequest({nome: login, senha, prevPath, setError}))

    } catch (error) {
      let message;
      message = getErrorMessage(error)
      setError( message || 'Falha ao logar')
      console.log('login handlesubmit', message)
    }

  }, [setError, login, senha, dispatch, prevPath])

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MyForm onSubmit={handleSubmit}>
        <MyInput
          labelName={'Login'}
          id='login'
          autoComplete='username'
          type='text'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <MyInput
          labelName={'Senha'}
          type="password"
          id="senha"
          autoComplete='current-password'
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </MyForm>
    </div>
  );
}
