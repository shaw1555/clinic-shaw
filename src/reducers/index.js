import { combineReducers } from "redux";
import patientReducer from './patientReducer';
import recordReducer from "./recordReducer";

export default combineReducers({
    patients: patientReducer,
    records: recordReducer
});