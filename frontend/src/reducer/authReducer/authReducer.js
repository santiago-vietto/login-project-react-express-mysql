import { AUTH_TYPES } from "./authActions";

export function authReducer(state, action) {
  switch (action.type) {
    case AUTH_TYPES.AUTH_START:
      return { 
        ...state, 
        loading: true, 
        error: null 
      };

    case AUTH_TYPES.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        user: action.payload,
        error: null,
      };

    case AUTH_TYPES.AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        isAuth: false,
        user: null,
        error: action.payload,
      };

    case AUTH_TYPES.AUTH_LOGOUT:
      return { 
        ...state, 
        loading: false, 
        isAuth: false, 
        user: null, 
        error: null 
      };

    default:
      return state;
  }
}
