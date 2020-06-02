import { combineReducers } from "redux";
import patientReducer from './patientReducer';

export default combineReducers({
    patients: patientReducer
});