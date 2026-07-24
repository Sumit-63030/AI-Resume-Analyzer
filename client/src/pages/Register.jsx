import { Link } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  return (
    <div className="register">
      <div className="register__card">

        <h1 className="register__title">
          AI Resume Analyzer
        </h1>

        <p className="register__subtitle">
          Create your account
        </p>

        <form className="register__form">

          <input
            className="register__input"
            type="text"
            placeholder="Full Name"
          />

          <input
            className="register__input"
            type="email"
            placeholder="Email"
          />

          <input
            className="register__input"
            type="password"
            placeholder="Password"
          />

          <button className="register__button">
            Register
          </button>

        </form>

        <p className="register__footer">
          Already have an account?
          <Link className="register__link" to="/">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;