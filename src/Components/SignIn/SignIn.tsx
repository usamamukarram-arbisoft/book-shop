import { useEffect, useState } from "react";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./SinginSlice";
import type { RootState } from "../../Store/Store";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispach = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/books");
    }
  }, [isLoggedIn]);
  const logIn = () => {
    dispach(loginUser({ email, password }));
  };

  return (
    <div className="main bg-light d-flex align-items-center justify-content-center">
      <div className="card shadow-lg w-100">
        <div className="card-body">
          <div className="text-center">
            <h1 className="card-title h3">Sign in</h1>
            <p className="card-text text-muted">
              Sign in below to access your account
            </p>
          </div>
          <div className="mt-4">
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="form-label text-muted">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label text-muted">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid">
                <button
                  type="button"
                  onClick={logIn}
                  className="btn primary  btn-lg btn-color"
                >
                  Sign in
                </button>
              </div>
              <p className="text-center text-muted mt-4">
                Don't have an account yet?
                <a className="text-decoration-none">Sign up</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
