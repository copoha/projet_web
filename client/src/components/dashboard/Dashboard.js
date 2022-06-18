import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import { getTheatresByTown, getShowtimesByTheatre } from "../../actions/theatreActions";
import { getTown} from "../../actions/townAction";
import axios from "axios";
import M from "materialize-css";

//import {RotatingCard, RotatingCardFront, RotatingCardBack} from "material-kit-react";
function Dashboard(props) {
  let navigate = useNavigate();
  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
    navigate('/');
  };

  const { user } = props.auth;
      const theatres = []
      for (var key in props.theaters) {
        theatres.push(props.theaters[key])
      }
      let userName = "";
      let town = "Paris";
      if(props.auth.isAuthenticated){
        userName = user.name.split(" ")[0];
        town = "Reims"
      }
      let towns = {}
  useEffect(() => {
    //M.AutoInit();
    props.getTheatresByTown(town)
    props.getShowtimesByTheatre(town, "Opera")
    props.getTown()
    for (var key in props.theaters.town) {
      towns[props.theaters.town[key].nom] = null
      //console.log(key)
      }
   }, [])
  
   
      
        //console.log(towns)   
          
  //const [theatres, setTheatres] = useState([]);
  
  //setTheatres(props.theaters)
 
  //console.log(props.showtimes)

  // document.addEventListener('DOMContentLoaded', function() {
  //   var elems = document.querySelectorAll('.carousel');
  //   var instances = Carousel.init(elems, options);
  // });
  //

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, {
      data : towns
    });
    console.log(instances[0].options.data) 
    //var instance = M.Autocomplete.getInstance(elem);
  });
  return (
    
    
        <div>
          <h6>
            <b>Bonjour,</b> {userName}
          </h6>
          <div style={{ height: "75vh" }} >
            <div className="row">
              <h6>
              <b>Les salles à,</b>
        <div class="input-field col s12">
          <i class="material-icons prefix">pin_drop</i>
          <input type="text" id="autocomplete-input" class="autocomplete"/>
          <label for="autocomplete-input">Ville</label>
      </div></h6>
              <div class="carousel">
              {theatres[0].map(theatre=>{
        return <div class="col s2">
        <div class="card" style={{width:150, marginLeft:10,marginRight:10}}>
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src={require("../../images/salle.webp")}/>
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">{theatre.fields.cinema}<i class="material-icons right">more_vert</i></span>
            <p><a href="#">Séances à venir</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">{theatre.fields.cinema}<i class="material-icons right">close</i></span>
            <p>{theatre.fields.adresse}, {theatre.fields.ville} </p>
          </div>
        </div>
      </div>
      })}
      </div>
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
  theaters: state.theaters,
});
export default connect(
  mapStateToProps,
  { logoutUser,
  getTheatresByTown, getShowtimesByTheatre, getTown }
)(Dashboard);