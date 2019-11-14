import produce from 'immer';
import { Types as AuthTypes } from './auth';

/**
 * Action Types for the user reducer
 */
export const Types = {
  UPDATE_PROFILE_REQUEST: '@user/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: '@user/UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_ERROR: '@user/UPDATE_PROFILE_ERROR',
};

/**
 * Action Creators
 */
export const ActionCreators = {
  /**
   * Action to call to update the user
   */
  updateProfileRequest: data => ({
    type: Types.UPDATE_PROFILE_REQUEST,
    payload: { data },
  }),

  /**
   * When the update gets succeeded
   */
  updateProfileSuccess: profile => ({
    type: Types.UPDATE_PROFILE_SUCCESS,
    payload: { profile },
  }),

  updateProfileError: () => ({
    type: Types.UPDATE_PROFILE_ERROR,
  }),
};

const initialState = {
  profile: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case AuthTypes.SING_IN_SUCCESS:
      return produce(state, draft => {
        draft.profile = action.payload.user;
      });

    case Types.UPDATE_PROFILE_SUCCESS:
      return produce(state, draft => {
        draft.profile = action.payload.profile;
      });

    case Types.UPDATE_PROFILE_ERROR:
      return state;

    case AuthTypes.SIGN_OUT:
      return produce(state, draft => {
        draft.profile = null;
      });

    default:
      return state;
  }
}
