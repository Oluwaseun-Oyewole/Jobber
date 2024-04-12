import jobs from "@/app/store/slice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  jobs,
});

export default rootReducer;
