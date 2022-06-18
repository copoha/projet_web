import axios from "axios";
import {
    GET_ERRORS,
    FETCH_TOWNS
  } from "./types";


//Get list of theatres
export const getTown = () => dispatch => {
  axios
    .get("/towns/list")
    .then(res => { 
      //console.log(res.data)
      dispatch({
        type: FETCH_TOWNS,
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