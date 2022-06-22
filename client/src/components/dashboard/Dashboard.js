import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import { getTheatresByTown, getShowtimesByTheatre } from "../../actions/theatreActions";
import { getTown } from "../../actions/townAction";
import axios from "axios";
import M from "materialize-css";
import { Theaters } from "./Theater";

//import {RotatingCard, RotatingCardFront, RotatingCardBack} from "material-kit-react";
function Dashboard(props) {
  const [selectedTowns, setselectedTowns] = useState("Paris")


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

  let towns = { "Reims": null, "Metz": null, "Caen": null, "Paris": null, "Marseille": null, "Lyon":null, "Toulouse":null, "Nice":null, "Nantes":null, "Montpellier":null, "Strasbourg":null, "Bordeaux":null, "Lille":null, "Rennes":null, "Toulon":null, "Saint-Etienne":null, "Le Havre":null, "Grenoble":null, "Dijon":null, "Angers":null, "Saint-Denis":null, "Villeurbanne":null, "Nîmes":null }


  useEffect(() => {
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, {
      data: towns,
      limit: 10,
      minLength:0,  
      onAutocomplete: (town) => setselectedTowns(town)
    });
    console.log("got towns")
  }, [])


  useEffect(() => {
    //M.AutoInit();
    console.log("")
    props.getTheatresByTown(selectedTowns)
    //props.getShowtimesByTheatre(town, "Opera")
    //props.getTown()

    // console.log("props.theaters.town", props.theaters)
    // for (var key in props.theaters.town) {
    //   towns[props.theaters.town[key].nom] = null
    //   //console.log(key)
    // }
    // console.log("towns", towns)
    // document.addEventListener('DOMContentLoaded', function () {
    //   var elems = document.querySelectorAll('.autocomplete');
    //   var instances = M.Autocomplete.init(elems, {
    //     data: towns,
    //     limit: 10
    //   });
    //   console.log(instances[0].options.data)
    //var instance = M.Autocomplete.getInstance(elem);
    // });
  }, [selectedTowns]);



  //console.log(towns)   

  //const [theatres, setTheatres] = useState([]);

  //setTheatres(props.theaters)

  //console.log(props.showtimes)

  // document.addEventListener('DOMContentLoaded', function() {
  //   var elems = document.querySelectorAll('.carousel');
  //   var instances = Carousel.init(elems, options);
  // });
  //


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
              <label for="autocomplete-input">Ville</label>
            </div>
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
    getTheatresByTown, getShowtimesByTheatre, getTown
  }
)(Dashboard);