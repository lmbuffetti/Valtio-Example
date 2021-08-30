import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { loggedInUser, getLoggedInUser } from '../../actions/UserActions';

function Login(props) {
  const {
    history,
  } = props;
  const loggedUser = getLoggedInUser();
  // STATE
  const [errorForm, setErrorForm] = useState({ username: false, pass: false });
  const [formValue, setFormValue] = useState({});

  useEffect(() => {
    if (get(loggedUser, 'data.id', null)) history.push('/account');
  }, [loggedUser]);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrorForm({ ...errorForm, username: false, pass: false });
    if (!formValue.name) setErrorForm({ ...errorForm, username: true });
    if (!formValue.pass) setErrorForm({ ...errorForm, pass: true });
    const data = {
      username: formValue.username,
      password: formValue.pass,
    };
    loggedInUser(data);
  };

  const onChangeValue = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <div className="bgLogin container-login100">
      <div className="wrap-login100 pt-4 pb-6">
        <span className="login100-form-title pb-5">
          Account Login
        </span>
        <form
          onSubmit={(e) => onSubmit(e)}
          className="login100-form validate-form pb-4 pt-1"
        >

          <div
            className={`wrap-input100 validate-input ${errorForm.username ? 'alert-validate' : ''}`}
            data-validate="Enter username"
          >
            <input
              className="input100"
              type="text"
              name="username"
              placeholder="User name"
              value={formValue.username}
              onChange={(e) => onChangeValue(e)}
            />
            <span className="focus-input100" data-placeholder="&#xe82a;" />
          </div>

          <div
            className={`wrap-input100 validate-validate ${errorForm.pass ? 'alert-validate' : ''}`}
            data-validate="Enter password"
          >
            <input
              className="input100"
              type="password"
              name="pass"
              placeholder="Password"
              value={formValue.pass}
              onChange={(e) => onChangeValue(e)}
            />
            <span className="focus-input100" data-placeholder="&#xe80f;" />
          </div>

          <div className="container-login100-form-btn mt-3">
            <button
              className="login100-form-btn"
              type="submit"
            >
              Login
            </button>
          </div>

          <div className="ta-c mt-2">
            Use this data to try the login:<br />
            email: eve.holt@reqres.in<br />
            password: cityslicka<br />
          </div>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Login;
