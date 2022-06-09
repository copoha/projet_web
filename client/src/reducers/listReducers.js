import {
    FETCH_THEATRES
  } from "../actions/types";
  //const isEmpty = require("is-empty");
  const initialState = {
    theaters: []
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_THEATRES :
        //console.log(action.payload)
        return {
          ...state,
          theaters : action.payload
        };
      default:
        return state;
    }
  }