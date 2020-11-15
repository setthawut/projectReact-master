import {
    VEHICLE_STEP_FETCHING,
    VEHICLE_STEP_SUCCESS,
    VEHICLE_STEP_FAILED,
  } from "../Constants.js";
  
  const initialState = {
    result: {},
    isFetching: false,
    isError: false,
    isLoading: false,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case VEHICLE_STEP_FETCHING:
        return {
          ...state,
          isFetching: true,
          isError: false,
          result: {},
          isLoading: true,
        };
      case VEHICLE_STEP_SUCCESS:
        return {
          ...state,
          isFetching: false,
          isError: false,
          result: payload,
          isLoading: false,
        };
      case VEHICLE_STEP_FAILED:
        return {
          ...state,
          result: {},
          isFetching: false,
          isError: true,
          isLoading: false,
        };
      default:
        return state;
    }
  };
  