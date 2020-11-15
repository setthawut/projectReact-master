import {
  INSURANCE_IMG_FETCHING,
  INSURANCE_IMG_SUCCESS,
  INSURANCE_IMG_FAILED,
} from "../Constants";
import Api from "../services/httpClient";

export const setStateToFetching = () => ({
  type: INSURANCE_IMG_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: INSURANCE_IMG_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: INSURANCE_IMG_FAILED,
  payload,
});

//-----------------------------------------------[Action]----------------------------------------------------------------------------//

export const fetchImg = (id) => {
 
  return async (dispatch) => {
    dispatch(setStateToFetching());
    try {
      let res = await Api.get(`api/v1/insurance/${id}`);
      dispatch(setStateToSuccess(res.data.result.insurance_image));
    } catch (err) {
      alert(err)
    }
  };
};
//----------------- function นี้ หน้าที่เป็น Step--------------//
export const fetchImg_Insurance_vehicle = (id) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    try {
      let res = await Api.get(`api/v1/vehicle/${id}`);
      dispatch(setStateToSuccess(res.data.result.insurance_page.insurance_image));
    } catch (err) {}
  };
};

export const fetchImg_Blank = () => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
  };
};
