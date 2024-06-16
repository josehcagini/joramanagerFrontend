import { call, put, all, takeLatest } from 'redux-saga/effects';

import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';
import getErrorMessage from '../../../utils/getErrorMessage';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/login', { nome: payload.nome, senha: payload.senha });
    yield put(actions.loginSuccess({ ...response.data }));

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    console.log('teste')

    //history.push('/');
    //history.go(0);

  } catch (error) {
    const message = getErrorMessage(error)
    payload.setError(message)
    console.log('erro login request', error);
    yield put(actions.loginFailure());
  }
}

function* logout() {
  try {
    yield put(actions.logoutSucess())
    axios.defaults.headers.Authorization = ''
    history.push('/login');
    history.go(0);
  } catch (error) {
    console.log('erro logout', error)
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSISTE_REHYDRATE, persistRehydrate),
  takeLatest(types.LOGOUT, logout)
]);
