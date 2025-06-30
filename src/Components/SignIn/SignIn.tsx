import "./SignIn.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { RootState } from "../../Store/Store";
import { loginRequest } from "../../Utility/Api";
import { Messages } from "../../Utility/CommonMessages";
import { loginUser } from "./SinginSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispach = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/books");
    }
  }, [isLoggedIn]);
  const logIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const loginObj = Object.fromEntries(formData.entries());

    const email = loginObj.email.toString();
    const password = loginObj.password.toString();
    if (email && password)
      loginRequest({ email, password }).then((user) => {
        dispach(loginUser(user));
      });
  };

  return (
    <div className="main bg-light d-flex align-items-center justify-content-center">
      <div className="card shadow-lg w-100">
        <div className="card-body">
          <div className="text-center">
            <h1 className="card-title h3">{Messages.SignIn.cardTitle.value}</h1>
            <p className="card-text text-muted">
              {Messages.SignIn.cardText.value}
            </p>
          </div>
          <div className="mt-4">
            <form onSubmit={logIn}>
              <div className="mb-4">
                <label htmlFor="email" className="form-label text-muted">
                  {Messages.SignIn.emailLable.value}
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder={Messages.SignIn.emailLable.value}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label text-muted">
                  {Messages.SignIn.passwordLable.value}
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder={Messages.SignIn.passwordLable.value}
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn primary  btn-lg btn-color">
                  {Messages.SignIn.loginBtn.value}
                </button>
              </div>
              <p className="text-center text-muted mt-4">
                {Messages.SignIn.signupText.value}
                <a className="text-decoration-none">
                  {Messages.SignIn.signupLink.value}
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
