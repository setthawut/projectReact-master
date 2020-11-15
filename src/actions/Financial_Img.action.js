import {
  FINANCIAL_IMG_FETCHING,
  FINANCIAL_IMG_SUCCESS,
  FINANCIAL_IMG_FAILED,
} from "../Constants";
import Api from "../services/httpClient";

export const setStateToFetching = () => ({
  type: FINANCIAL_IMG_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: FINANCIAL_IMG_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: FINANCIAL_IMG_FAILED,
  payload,
});

//-----------------------------------------------[Action]----------------------------------------------------------------------------//

export const fetchImg = (id) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    try {
      let res = await Api.get(`api/v1/financial/${id}`);
      dispatch(setStateToSuccess(res.data.result.financial_images));
    } catch (err) {}
  };
};
//----------------- function นี้ หน้าที่เป็น Step--------------//
export const fetchImg_Financial_vehicle = (id) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    try {
      let res = await Api.get(`api/v1/vehicle/${id}`);
      dispatch(setStateToSuccess(res.data.result.financial.financial_images));
    } catch (err) {}
  };
};

export const fetchImg_Blank = () => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
  };
};
