import {
  DRIVER_ID_FETCHING,
  DRIVER_ID_SUCCESS,
  DRIVER_ID_FAILED,
} from "../Constants";
import Api from "../services/httpClient";

export const setStateToFetching = () => ({
  type: DRIVER_ID_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: DRIVER_ID_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: DRIVER_ID_FAILED,
  payload,
});

//-----------------------------------------------[Action]----------------------------------------------------------------------------//

export const fetchImg = (id) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    try {
      let res = await Api.get(`api/v1/driver/${id}`);
      dispatch(setStateToSuccess(res.data.result.driver_image));
    } catch (err) {}
  };
};
export const fetchImg_Blank = () => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
  };
};
