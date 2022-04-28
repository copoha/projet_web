import React, { useState, useEffect } from "react";
import { Link, BrowserRouter, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { withRouter } from "../../utils/withRouterComponent";
import { createBrowserHistory } from 'history';
function Login(props) {
  // constructor() {
  //   super();
  //   this.state = {
  //     email: "",
  //     password: "",
  //     errors: {}
  //   };
  // }
  const [errors, setErrors] = useState([]);

  const [userData, setValues] = useState({
    email: '',
    password: '',
   })

  let navigate = useNavigate();

   useEffect(() => {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (props.auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      navigate("/dashboard"); // push user to dashboard when they login
    }
if (props.errors) {
      setErrors(props.errors);
    }
  }, [props.counter]);
const onChange = e => {
  setValues({...userData, [e.target.id]: e.target.value });
  };
const onSubmit = e => {
    e.preventDefault();
// const userData = {
//       email: email,
//       password: password
//     };

    props.loginUser(userData, props.router);
  };

    //const { errors } = this.state;
return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={userData.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={userData.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));