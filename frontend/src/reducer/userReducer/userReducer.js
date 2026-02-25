import { USER_TYPES } from "./userActions";

export function userReducer(state, action) {
  switch (action.type) {
    case USER_TYPES.USERS_START: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case USER_TYPES.USERS_GET_ALL_SUCCESS: {
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null,
      };
    }

    case USER_TYPES.USER_DELETE_SUCCESS: {
      return {
        ...state,
        loading: false,
        users: state.users.filter((u) => u.id !== action.payload),
        error: null,
      };
    }

    case USER_TYPES.USER_UPDATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        users: state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u
        ),
        error: null,
      };
    }

    case USER_TYPES.USERS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case USER_TYPES.USERS_CLEAR: {
      return {
        ...state,
        users: [],
        loading: false,
        error: null,
      };
    }

    default:
      return state;
  }
}
