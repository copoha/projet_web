import axios from "axios";
import {
    GET_ERRORS,
    FETCH_THEATRES
  } from "./types";


//Get list of theatres
export const getTheatresByTown = (town) => dispatch => {
  axios
    .get("/theatres/list", {params:{town: town} })
    .then(res => { 
      console.log(res.data)
      dispatch({
        type: FETCH_THEATRES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }),
    );
};

// export const getTheatresByTown = (town) => dispatch => {
//     axios
//       .get("/theatres/list", town)
//       .then(res => console.log(res)) // re-direct to login on successful register
//       .catch(err =>
//         dispatch({
//           type: GET_ERRORS,
//           payload: err.response.data
//         })
//       );
//   };