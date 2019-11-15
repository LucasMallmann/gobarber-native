import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import {
  Types as UserTypes,
  ActionCreators as UserActions,
} from '~/store/ducks/user';

/**
 * Function to be called when user request to update his profile
 * @param {Object} payload Data from the form to update the user profile
 */
function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;
    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, '/users', profile);

    yield put(UserActions.updateProfileSuccess(response.data));
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
  } catch (error) {
    Alert.alert(
      'Falha na atualização',
      'Erro ao atualizar perfil. Por favor, verifique seus dados',
    );
    console.tron.log(error);
    yield put(UserActions.updateProfileError());
  }
}

export default all([
  takeLatest(UserTypes.UPDATE_PROFILE_REQUEST, updateProfile),
]);
