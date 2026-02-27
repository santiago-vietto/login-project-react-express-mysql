import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContextProvider";
import './registerform.css'

const Registerform = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [localError, setLocalError] = useState(null);

  const { register, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    const result = await register(values);

    if (result.ok) {
      navigate("/login");
    } else {
      setLocalError(result.message);
    }
  };

  return (
    <div className="form-shell">
      <h2 className="form-title">Sign-Up</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <input
            className="input"
            type="text"
            value={values.username}
            onChange={(e) =>
              setValues({ ...values, username: e.target.value })
            }
          />
        </div>

        <div className="field">
          <label className="label">Email</label>
          <input
            className="input"
            type="text"
            value={values.email}
            onChange={(e) =>
              setValues({ ...values, email: e.target.value })
            }
          />
        </div>

        <div className="field">
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            value={values.password}
            onChange={(e) =>
              setValues({ ...values, password: e.target.value })
            }
          />
          <div className="help">We'll never share your password with anyone else.</div>
          <div className="help"> <a href="/login">Sign in</a> if you are now registered.</div>
        </div>

        {(localError || error) && (
          <div className="form-error">
            {String(localError || error)}
          </div>
        )}

        <button className="btn" disabled={loading}>
          {loading ? "..." : "Sign up"}
        </button>
      </form>
    </div>
  );
};

export default Registerform;
