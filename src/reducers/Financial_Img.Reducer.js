import {
  FINANCIAL_IMG_FETCHING,
  FINANCIAL_IMG_SUCCESS,
  FINANCIAL_IMG_FAILED,
} from "../Constants.js";

const initialState = {
  result: {},
  isFetching: false,
  isError: false,
  isLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FINANCIAL_IMG_FETCHING:
      return {
        ...state,
        isFetching: true,
        isError: false,
        result: {},
        isLoading: true,
      };
    case FINANCIAL_IMG_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: false,
        result: payload,
        isLoading: false,
      };
    case FINANCIAL_IMG_FAILED:
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
