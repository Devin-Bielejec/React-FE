import AuthRoute from "../AuthRoute";
import { types } from "./index";

/** LOGIN USER */
export const doSignIn = data => dispatch => {
  dispatch({ type: types.LOGIN_START });
  return AuthRoute()
    .post("/auth/login", data)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: types.LOGIN_FAILURE, payload: err });
      console.log(err.response);
    });
};

/** REGISTER USER */
export const doRegister = data => dispatch => {
  dispatch({ type: types.REGISTER_USER_START });
  return AuthRoute()
    .post("/auth/register", data)
    .then(res => {
      dispatch({ type: types.REGISTER_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: types.REGISTER_USER_FAILURE, payload: err });
      console.log(err.response);
    });
};

/** GET USER PROFILE */
export const getUser = id => dispatch => {
  dispatch({ type: types.GET_USER_START });
  return AuthRoute()
    .get(`/users/${id}`)
    .then(res => {
      dispatch({ type: types.GET_USER_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: types.GET_USER_FAILURE, payload: err }));
};

// EDIT USER PROFILE
export const editUser = (user, id) => dispatch => {
  dispatch({ type: types.EDIT_USER_START });
  return AuthRoute()
    .put(`/users/${id}`, user)
    .then(res => {
      dispatch({ type: types.EDIT_USER_SUCCESS, payload: user });
    })
    .catch(err => dispatch({ type: types.EDIT_USER_FAILURE, payload: err }));
};

// DELETE USER PROFILE
export const deleteUser = id => dispatch => {
  dispatch({ type: types.DELETE_USER_START });
  return AuthRoute()
    .delete(`/users/${id}`)
    .then(res => {
      dispatch({ type: types.DELETE_LISTING_SUCCESS, payload: null });
    })
    .catch(err =>
      dispatch({ type: types.DELETE_LISTING_FAILURE, payload: err })
    );
};

//POST BOOKING "listing - Object with 3 keys: listing_id,startDate,stopDate"
export const postBooking = (listing_id, booking) => dispatch => {
  dispatch({ type: types.BOOKING_LISTING_START });
  return AuthRoute()
    .post(`/listings/${listing_id}/booking`, booking)
    .then(res => {
      dispatch({ type: types.BOOKING_LISTING_SUCCESS, payload: "Wow" });
    })
    .catch(err =>
      dispatch({ type: types.BOOKING_LISTING_FAILURE, payload: err })
    );
};

//Delete a Booking
export const deleteBooking = booking => dispatch => {
  dispatch({ type: types.DELETE_BOOKING_START });
  return AuthRoute()
    .delete(`/listings/${booking}/booking/${booking}`)
    .then(res => {
      dispatch({ type: types.DELETE_BOOKING_SUCCESS, payload: booking });
    })
    .catch(err =>
      dispatch({ type: types.DELETE_LISTING_FAILURE, payload: err })
    );
};
