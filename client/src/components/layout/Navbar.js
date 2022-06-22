import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouterComponent";
import { logoutUser } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";




function Navbar(props) {
  let navigate = useNavigate();
  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
    navigate('/');
  };
  const links = [];
  const privateLinks = [
      // Don't forget keys. The numbers here are only for example.
      <li><a class="waves-effect waves-light btn" onClick={onLogoutClick}>Log Out</a></li>
  ];
  const notLoggedLinks = [
    // Don't forget keys. The numbers here are only for example.
        <li><a onClick={() => navigate('/login')}>Login</a></li>,
        <li><a onClick={() => navigate('/register')}>Register</a></li>
  ];

  if("auth" in props && props.auth.isAuthenticated){
    links.push(...privateLinks);
  }else{
    links.push(...notLoggedLinks)
  }
  

  return (
    <div className="navbar-fixed">
      {/* <ul id="dropdown1" class="dropdown-content">
        <li><a href="#!">one</a></li>
        <li><a href="#!">two</a></li>
        <li class="divider"></li>
        <li><a href="#!">three</a></li>
      </ul> */}
      <nav>
        <div class="nav-wrapper">
          <a href="#!" class="brand-logo">Cinefalcon</a>
          <ul class="right hide-on-med-and-down">
            {links}
            {/* <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Dropdown<i class="material-icons right">arrow_drop_down</i></a></li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  logoutUser: PropTypes.func.isRequired,
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));