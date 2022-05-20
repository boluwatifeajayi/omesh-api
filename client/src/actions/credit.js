import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_CREDITS,
  CREDIT_ERROR,
  DELETE_CREDIT,
  ADD_CREDIT,
  GET_CREDIT,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for youZ, so no need for 
 JSON.stringify or JSON.parse
*/

// Get CREDITS
export const getCredits = () => async (dispatch) => {
  try {
    const res = await api.get('/credits');

    dispatch({
      type: GET_CREDITS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CREDIT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Delete post
export const deleteCredit = (id) => async (dispatch) => {
  try {
    await api.delete(`/credits/${id}`);

    dispatch({
      type: DELETE_CREDIT,
      payload: id
    });

    dispatch(setAlert('Credit Removed', 'success'));
  } catch (err) {
    dispatch({
      type: CREDIT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addCredit = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/credits', formData);

    dispatch({
      type: ADD_CREDIT,
      payload: res.data
    });

    dispatch(setAlert('Credit Created', 'success'));
  } catch (err) {
    dispatch({
      type: CREDIT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post
export const getCredit = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/credits/${id}`);

    dispatch({
      type: GET_CREDIT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CREDIT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (creditId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/credits/comment/${creditId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: CREDIT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (creditId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/credits/comment/${creditId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: CREDIT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
