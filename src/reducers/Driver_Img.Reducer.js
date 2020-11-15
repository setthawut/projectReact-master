import {
  DRIVER_ID_FETCHING,
  DRIVER_ID_SUCCESS,
  DRIVER_ID_FAILED,
} from "../Constants.js";

const initialState = {
  result: {},
  isFetching: false,
  isError: false,
  isLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case DRIVER_ID_FETCHING:
      return {
        ...state,
        isFetching: true,
        isError: false,
        result: {},
        isLoading: true,
      };
    case DRIVER_ID_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        result: payload,
        isLoading: false,
      };
    case DRIVER_ID_FAILED:
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
