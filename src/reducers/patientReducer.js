import * as TYPES from "../actions/types";
import patient from "../components/patient";

export default function (state = [], action) {
  switch (action.type) {
    case TYPES.GET_PATIENT:
      return action.payload;
    case TYPES.SAVE_PATIENT:
      return [action.payload, ...state];
    case TYPES.UPDATE_PATIENT:      
      return state.map((x) =>
        x._id !== action.payload._id ? x : action.payload
      );
    case TYPES.DELETE_PATIENT:
      return state.filter((x) => x._id !== action.payload._id);
    default:
      return state;
  }
}

