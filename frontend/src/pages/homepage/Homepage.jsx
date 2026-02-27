import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider"; 
import { UserContext } from "../../context/UserContextProvider";
import './homepage.css'


const Homepage = () => {
  const navigate = useNavigate();
  const { user, loading, error, logout } = useContext(AuthContext);

  const { username, email, teamName, isAdmin, role } = user || {};

  if (loading) return <div className="home-container">Cargando...</div>;

  const { users, loading: usersLoading, deleteUser } = useContext(UserContext);



  return (
    <div className="home-container">
      {user ? (
        <>
          <h3>Datos personales</h3>

          <div className="user-card">

            <div className="user-field">
              <label>Tipo de usuario: {role}</label>
            </div>

            <div className="user-field">
              <label>Username: {username}</label>
            </div>

            <div className="user-field">
              <label>Email: {email}</label>
            </div>

            <div className="user-field">
              <label>Team: {teamName}</label>
            </div>

          </div>

          {isAdmin && (
            <>
              <h3>Lista de usuarios</h3>

              {usersLoading ? (
                <p>Cargando usuarios...</p>
              ) : (
                <div className="users-list">
                  {users.map((u) => (
                    <div key={u.id} className="user-row">
                      <span>
                        {u.username} — {u.email} — {u.teamName}
                      </span>

                      <button
                        className="btn-delete"
                        onClick={() => deleteUser(u.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          <button
            onClick={async () => {
              await logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h3>No estás logueado ❌</h3>
          {error ? <p style={{ color: "crimson" }}>{String(error)}</p> : null}
          <button onClick={() => navigate("/login")}>Ir a login</button>
        </>
      )}
    </div>
  );
};

export default Homepage;

