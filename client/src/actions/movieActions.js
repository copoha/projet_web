import axios from "axios";
import {
    GET_ERRORS,
    FETCH_MOVIE
  } from "./types";

  export const getMovieByName = (name) => dispatch => {
    axios
      .get("/movies/movie", {params:{movie: name} })
      .then(res => { 
        console.log(res.data)
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }),
      );
  };
