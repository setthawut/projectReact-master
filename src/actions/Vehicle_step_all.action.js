import {
  VEHICLE_STEP_FETCHING,
  VEHICLE_STEP_SUCCESS,
  VEHICLE_STEP_FAILED,
} from "../Constants";
import Api from "../services/httpClient";

export const setStateToFetching = () => ({
  type: VEHICLE_STEP_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: VEHICLE_STEP_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: VEHICLE_STEP_FAILED,
  payload,
});

//-----------------------------------------------[Action]----------------------------------------------------------------------------//

export const fetchVehicle = () => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    try {
      let res = await Api.get(`api/v1/vehicle/dropdown-vehicle-steps-all`);

      dispatch(setStateToSuccess(res.data.result));
    } catch (err) {}
  };
};
