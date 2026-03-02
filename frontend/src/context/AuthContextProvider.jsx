import { createContext, useEffect, useReducer } from "react";
import { api } from "../api/api";
import { authInitialState } from "../reducer/authReducer/authInitialState";
import { authReducer } from "../reducer//authReducer/authReducer";
import { AUTH_TYPES } from "../reducer//authReducer/authActions";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const register = async (data) => {
    dispatch({ type: AUTH_TYPES.AUTH_START });

    try {
      await api.post("/api/auth/register", data);

      dispatch({ type: AUTH_TYPES.AUTH_FAILURE, payload: null });
      return { ok: true };
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.response?.data;
      dispatch({ type: AUTH_TYPES.AUTH_FAILURE, payload: errorMessage });
      return { ok: false, message: errorMessage };
    }
  };


  const me = async () => {
    dispatch({ type: AUTH_TYPES.AUTH_START });
    try {
      const res = await api.get("/api/user/me");
      dispatch({ type: AUTH_TYPES.AUTH_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_TYPES.AUTH_FAILURE, payload: null });
    }
  };

  const login = async (credentials) => {
    dispatch({ type: AUTH_TYPES.AUTH_START });
    try {
      const res = await api.post("/api/auth/login", credentials);

      if (res.data?.user) {
        dispatch({ type: AUTH_TYPES.AUTH_SUCCESS, payload: res.data.user });
      } else {
        await me();
      }

      return { ok: true };
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.response?.data;
      dispatch({ type: AUTH_TYPES.AUTH_FAILURE, payload: errorMessage });
      return { ok: false, message: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (_) {}
    dispatch({ type: AUTH_TYPES.AUTH_LOGOUT });
  };

  useEffect(() => {
    me(); 
  }, []);

  const value = { 
    ...state, 
    login, 
    logout, 
    me,
    register };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;