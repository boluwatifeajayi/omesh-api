import {
  GET_CREDITS,
  CREDIT_ERROR,
  DELETE_CREDIT,
  ADD_CREDIT,
  GET_CREDIT,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions/types';

const initialState = {
  credits: [],
  creditt: null,
  loading: true,
  error: {}
};

function creditReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CREDITS:
      return {
        ...state,
        credits: payload,
        loading: false
      };
    case GET_CREDIT:
      return {
        ...state,
        credit: payload,
        loading: false
      };
    case ADD_CREDIT:
      return {
        ...state,
        credits: [payload, ...state.credits],
        loading: false
      };
    case DELETE_CREDIT:
      return {
        ...state,
        credits: state.credits.filter((credit) => credit._id !== payload),
        loading: false
      };
    case CREDIT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        credit: { ...state.credit, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        credit: {
          ...state.credit,
          comments: state.credit.comments.filter(
            (comment) => comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}

export default creditReducer;
