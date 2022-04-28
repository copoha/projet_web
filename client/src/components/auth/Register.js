import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import {withRouter} from "../../utils/withRouterComponent";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { createBrowserHistory } from 'history';
function Register(props) {
  // constructor() {
  //   let navigate = useNavigate();
  //   super();
  //   this.state = {
  //     name: "",
  //     email: "",
  //     password: "",
  //     password2: "",
  //     errors: {}
  //   };
  // }
  const [newUser, setValues] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
   })

// const [name, setName] = useState('');
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [password2, setPassword2] = useState('');

const [errors, setErrors] = useState([]);

let navigate = useNavigate();
  
 useEffect(() => {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (props.auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);
  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props.counter]);
const onChange = e => {
    setValues({...newUser, [e.target.id]: e.target.value });
  };
const onSubmit = e => {
    e.preventDefault();
// const newUser = {
//       name: newUser.name,
//       email: newUser.email,
//       password: newUser.password,
//       password2: newUser.password2
//     };
    props.registerUser(newUser, props.router);
  };

return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={newUser.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={newUser.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={newUser.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={newUser.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
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
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));