import { combineReducers } from "redux";

import Driver_img from "./Driver_Img.Reducer";
import Financial_img from "./Financial_Img.Reducer";
import Vehicle_step_all_option from "./Vehicle_step_all_option.Reducer";
import Vehicle_Img from "./Vehicle_Img.Reducer";
import OilCard_Img from "./OilCard_Img.Reducer";
import Insurance_Img from "./Insurace_Img.Reducer";
export default combineReducers({
  Driver_img,
  Financial_img,
  Vehicle_step_all_option,
  Vehicle_Img,
  OilCard_Img,
  Insurance_Img,
});
