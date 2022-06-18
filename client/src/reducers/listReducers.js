import {
    FETCH_THEATRES,
    FETCH_SHOWTIMES,
    FETCH_TOWNS
  } from "../actions/types";
  //const isEmpty = require("is-empty");
  const initialState = {
    theaters: [],
    showtimes:[],
    town: ''
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_THEATRES :
        //console.log(action.payload)
        return {
          ...state,
          theaters : action.payload
        };
      case FETCH_SHOWTIMES :
        //console.log(action.payload)
        return {
          ...state,
          showtimes : action.payload
        };
      case FETCH_TOWNS :
        //console.log(action.payload)
        return {
          ...state,
          town: action.payload
        };
      default:
        return state;
    }
  }