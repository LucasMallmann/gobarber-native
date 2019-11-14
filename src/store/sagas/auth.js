import { all, takeLatest, call, put } from 'redux-saga/effects';
// import { toast } from 'react-toastify';
import { Alert } from 'react-native';

import {
  Types as AuthTypes,
  ActionCreators as AuthActions,
} from '~/store/ducks/auth';

import api from '~/services/api';
// import history from '~/services/history';

/**
 * Saga to run to login the user
 * @param {object} payload
 */
export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, '/sessions', { email, password });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'O usuário não pode ser prestador de serviços',
      );
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(AuthActions.signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (error) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login. Por favor, verifique seus dados',
    );
    yield put(AuthActions.signFailure());
  }
}

/**
 * Saga effect to Store the a new User
 * @param {object} payload
 */
export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, '/users', {
      name,
      email,
      password,
    });

    Alert.alert('Bem vindo!', 'Sua conta foi criada com sucesso');
  } catch (error) {
    Alert.alert(
      'Falha no cadastro',
      'Houve um erro no cadastro. Por favor, verifique seus dados',
    );
    yield put(AuthActions.signFailure());
  }
}

/**
 * Saga to be execute when Redux Persist ('persist/REHYDRATE') retrieves the token
 * Will store the token in the api service by default, so it can be used in future requests
 */
function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(AuthTypes.SING_IN_REQUEST, signIn),
  takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),
  takeLatest(AuthTypes.SIGN_OUT, signOut),
]);
