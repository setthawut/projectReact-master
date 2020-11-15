import {
    OILCARD_IMG_FETCHING,
    OILCARD_IMG_SUCCESS,
    OILCARD_IMG_FAILED,
  } from "../Constants";
  import Api from "../services/httpClient";
  
  export const setStateToFetching = () => ({
    type: OILCARD_IMG_FETCHING,
  });
  
  export const setStateToSuccess = (payload) => ({
    type: OILCARD_IMG_SUCCESS,
    payload,
  });
  
  export const setStateToFailed = (payload) => ({
    type: OILCARD_IMG_FAILED,
    payload,
  });
  
  //-----------------------------------------------[Action]----------------------------------------------------------------------------//
  
  export const fetchImg = (id) => {
    return async (dispatch) => {
      dispatch(setStateToFetching());
      try {
        let res = await Api.get(`api/v1/oil-card/${id}`);
        console.log("res.data.result.oilcard_images",res.data.result.oil_card_image)
        dispatch(setStateToSuccess(res.data.result.oil_card_image));
      } catch (err) {}
    };
  };
  //----------------- function นี้ หน้าที่เป็น Step--------------//
  // export const fetchImg_Financial_vehicle = (id) => {
  //   return async (dispatch) => {
  //     dispatch(setStateToFetching());
  //     try {
  //       let res = await Api.get(`api/v1/vehicle/${id}`);
  //       dispatch(setStateToSuccess(res.data.result.financial.financial_images));
  //     } catch (err) {}
  //   };
  // };
  
  export const fetchImg_Blank = () => {
    return async (dispatch) => {
      dispatch(setStateToFetching());
    };
  };
  