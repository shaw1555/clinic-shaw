import * as TYPES from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case TYPES.GET_RECORD:
      return action.payload;
    case TYPES.SAVE_RECORD:
      return [action.payload, ...state];
    case TYPES.UPDATE_RECORD:      
      return state.map((x) =>
        x._id !== action.payload._id ? x : action.payload
      );
    case TYPES.DELETE_RECORD:
      return state.filter((x) => x._id !== action.payload._id);
    default:
      return state;
  }
}

