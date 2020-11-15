import {
  VEHICLE_IMG_FETCHING,
  VEHICLE_IMG_SUCCESS,
  VEHICLE_IMG_FAILED,
} from "../Constants";
import Api from "../services/httpClient";

export const setStateToFetching = () => ({
  type: VEHICLE_IMG_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: VEHICLE_IMG_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: VEHICLE_IMG_FAILED,
  payload,
});

//-----------------------------------------------[Action]----------------------------------------------------------------------------//

export const fetchImg = (id) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    try {
      let res = await Api.get(`api/v1/vehicle/${id}`);
      dispatch(setStateToSuccess(res.data.result.vehicle.vehicle_image));
    } catch (err) {}
  };
};
