import produce from 'immer';

const initialState = {
  token: null,
  signed: false,
  loading: false,
};

export const Types = {
  SING_IN_REQUEST: '@auth/SING_IN_REQUEST',
  SING_IN_SUCCESS: '@auth/SING_IN_SUCCESS',
  SIGN_FAILURE: '@auth/SIGN_FAILURE',
  SIGN_UP_REQUEST: '@auth/SIGN_UP_REQUEST',
  SIGN_OUT: '@auth/SIGN_OUT',
};

export const ActionCreators = {
  /**
   * @param {string} email The user email
   * @param {string} password The user password
   */
  singInRequest: (email, password) => ({
    type: Types.SING_IN_REQUEST,
    payload: { email, password },
  }),

  /**
   * @param {Object} token Token with user information
   * @param {Object} user The logged user
   */
  signInSuccess: (token, user) => ({
    type: Types.SING_IN_SUCCESS,
    payload: { token, user },
  }),

  /**
   * Store a new user
   * @param {string} name
   * @param {string} email
   * @param {string} password
   */
  signUpRequest: (name, email, password) => ({
    type: Types.SIGN_UP_REQUEST,
    payload: { name, email, password },
  }),

  /**
   * When the login does not work
   */
  signFailure: () => ({
    type: Types.SIGN_FAILURE,
  }),

  /**
   * Logout of the application
   */
  signOut: () => ({
    type: Types.SIGN_OUT,
  }),
};

export default function auth(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.SING_IN_SUCCESS: {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }

      case Types.SING_IN_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.SIGN_FAILURE: {
        draft.loading = false;
        draft.token = null;
        break;
      }
      case Types.SIGN_OUT: {
        draft.signed = false;
        draft.token = null;
        break;
      }
      default:
        return state;
    }
  });
}
