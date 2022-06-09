import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import { getTheatresByTown } from "../../actions/theatreActions";
import axios from "axios";
//import {RotatingCard, RotatingCardFront, RotatingCardBack} from "material-kit-react";
function Dashboard(props) {
  let navigate = useNavigate();
  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
    navigate('/');
  };

  useEffect(() => {
    props.getTheatresByTown("Metz")
   }, [])
  //const [theatres, setTheatres] = useState([]);
  
  //setTheatres(props.theaters)
  //console.log(props.theaters)
  
      const { user } = props.auth;
      const theatres = [{"name":"Kinépolis"}, {"name":"UGC"}, {"name":"Gaumont"}]

      let userName = "";
      let town = "Paris";
      if(props.auth.isAuthenticated){
        userName = user.name.split(" ")[0];
        town = "Reims"
      }
  return (
    
    
        <div>
          <h6>
            <b>Bonjour,</b> {userName}
          </h6>
          <div style={{ height: "75vh" }} >
            <div className="row">
              <h6>
                <b>Les salles à,</b> {town}
              </h6>
              {theatres.map(theatre=>{
        return <div class="col s2">
        <div class="card" style={{width:150, marginLeft:10,marginRight:10}}>
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src={require("../../images/salle.webp")}/>
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">{theatre.name}<i class="material-icons right">more_vert</i></span>
            <p><a href="#">This is a link</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">{theatre.name}<i class="material-icons right">close</i></span>
            <p>Here is some more information about this product that is only revealed once clicked on.</p>
          </div>
        </div>
      </div>
      })}
            </div>
          </div>
        </div>
      );
  }

Dashboard.propTypes = {
  getTheatresByTown: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  theaters: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  theaters: state.theaters
});
export default connect(
  mapStateToProps,
  { logoutUser,
  getTheatresByTown }
)(Dashboard);