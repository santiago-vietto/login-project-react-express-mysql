import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginform.css";
import { AuthContext } from "../../context/AuthContextProvider"; 

const Loginform = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [localError, setLocalError] = useState(null);

  const { login, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    const result = await login(credentials);

    if (result.ok) {
      navigate("/"); 
    } else {
      setLocalError(result.message);
    }
  };

  return (
    <div className="form-shell">
      <h2 className="form-title">Sign-In</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="username">Username</label>
          <input
            className="input"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="password">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>

        {(localError || error) && (
            <div className="form-error">
                {String(localError || error)}
            </div>
        )}

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "..." : "Log in"}
        </button>
      </form>
    </div>
  );
};

export default Loginform;

