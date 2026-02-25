import { createContext, useContext, useEffect, useReducer } from "react";
import { api } from "../api/api";
import { AuthContext } from "./AuthContextProvider";
import { userReducer } from "../reducer/userReducer/userReducer";
import { userInitialState } from "../reducer/userReducer/userInitialState";
import { USER_TYPES } from "../reducer/userReducer/userActions";

export const UserContext = createContext(null);

export default function UsersContextProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(userReducer, userInitialState);

  const getAllUsers = async () => {
    dispatch({ type: USER_TYPES.USERS_START });

    try {
      const res = await api.get("/api/user");
      dispatch({
        type: USER_TYPES.USERS_GET_ALL_SUCCESS,
        payload: res.data,
      });
      return { ok: true };
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.response?.data;
      dispatch({
        type: USER_TYPES.USERS_FAILURE,
        payload: errorMessage,
      });
      return { ok: false, message: errorMessage };
    }
  };

  const getUserById = async (id) => {
    dispatch({ type: USER_TYPES.USERS_START });

    try {
      const res = await api.get(`/api/user/${id}`);
      dispatch({
        type: USER_TYPES.USERS_GET_BY_ID_SUCCESS,
        payload: res.data,
      });
      return { ok: true, user: res.data };
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.response?.data;
      dispatch({
        type: USER_TYPES.USERS_FAILURE,
        payload: errorMessage,
      });
      return { ok: false, message: errorMessage };
    }
  };

  const updateUser = async (id, data) => {
    dispatch({ type: USER_TYPES.USERS_START });

    try {
      const res = await api.put(`/api/user/${id}`, data);

      dispatch({
        type: USER_TYPES.USER_UPDATE_SUCCESS,
        payload: res.data,
      });

      return { ok: true };
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.response?.data;
      dispatch({
        type: USER_TYPES.USERS_FAILURE,
        payload: errorMessage,
      });
      return { ok: false, message: errorMessage };
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/api/user/${id}`);

      dispatch({
        type: USER_TYPES.USER_DELETE_SUCCESS,
        payload: Number(id),
      });

      return { ok: true };
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.response?.data;

      dispatch({
        type: USER_TYPES.USERS_FAILURE,
        payload: errorMessage,
      });

      return { ok: false, message: errorMessage };
    }
  };

  useEffect(() => {
    if (user?.isAdmin) {
      getAllUsers();
    } else {
      dispatch({ type: USER_TYPES.USERS_CLEAR });
    }
  }, [user?.isAdmin]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        getAllUsers,
        getUserById,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

