import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import { getTheatresByTown, getShowtimesByTheatre } from "../../actions/theatreActions";
import { getTown } from "../../actions/townAction";
import { updateTown } from "../../actions/authActions";
import axios from "axios";
import M from "materialize-css";
import { Theaters } from "./Theater";

function Dashboard(props) {
  const { user } = props.auth;
  const [selectedTowns, setselectedTowns] = useState(user.town || "Paris")

  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
    navigate('/');
  };

  let navigate = useNavigate();
  const onAddTownClick = e => {
    props.updateTown(user, selectedTowns)
    user.town = selectedTowns
  };

  
  const theatres = []
  for (var key in props.theaters) {
    theatres.push(props.theaters[key])
  }
  let userName = "";
  let town = "Paris";
  if (props.auth.isAuthenticated) {
    userName = user.name.split(" ")[0];
    town = user.town || "Reims";
  }
  let towns = { "Reims": null, "Metz": null, "Caen": null, "Paris": null, "Marseille": null, "Lyon":null, "Toulouse":null, "Nice":null, "Nantes":null, "Montpellier":null, "Strasbourg":null, "Bordeaux":null, "Lille":null, "Rennes":null, "Toulon":null, "Saint-Etienne":null, "Le Havre":null, "Grenoble":null, "Dijon":null, "Angers":null, "Saint-Denis":null, "Villeurbanne":null, "Nîmes":null }


  useEffect(() => {
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, {
      data: towns,
      limit: 10,
      minLength:0,  
      onAutocomplete: (town) => setselectedTowns(town)
    });

  }, [props.auth.isAuthenticated])


  useEffect(() => {
    props.getTheatresByTown(selectedTowns)
  }, [selectedTowns]);





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
              <input type="text" id="autocomplete-input" class="autocomplete" />
              <label for="autocomplete-input">{selectedTowns}</label>
            </div>
            {props.auth.isAuthenticated &&
             <a class="btn-floating waves-effect waves-light red"  onClick={onAddTownClick}><i class="material-icons">add</i></a>
             }
          </h6>
          <div class="carousel" style={{ height: '100%' , flex: "1"}}>
            {theatres[0].map(theatre => <Theaters theatre={theatre} /> )}
          </div>
        </div>
      </div>
    </div>
  );
} 

Dashboard.propTypes = {
  getTheatresByTown: PropTypes.func.isRequired,
  updateTown: PropTypes.func.isRequired,
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
  {
    logoutUser,
    getTheatresByTown, getShowtimesByTheatre, getTown, updateTown
  }
)(Dashboard);