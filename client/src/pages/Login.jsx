import "../styles/Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <div className="login__card">

        <h1 className="login__title">
          AI Resume Analyzer
        </h1>

        <p className="login__subtitle">
          Login to continue
        </p>

        <form className="login__form">

          <input
            className="login__input"
            type="email"
            placeholder="Email"
          />

          <input
            className="login__input"
            type="password"
            placeholder="Password"
          />

          <button className="login__button">
            Login
          </button>

        </form>

        <p className="login__footer">
          Don't have an account?
          <Link className="login__link" to="/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;