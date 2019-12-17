import {axiosWithYelpAuth} from "../utils/axiosWithYelpAuth";
import axios from "axios";

export const FETCH_BUSINESS_START = "FETCH_BUSINESS_START";
export const FETCH_BUSINESS_SUCCESS = "FETCH_BUSINESS_SUCCESS";
export const FETCH_BUSINESS_FAILURE = "FETCH_BUSINESS_FAILURE";
export const POST_BUSINESS_START = "POST_BUSINESS_START";
export const POST_BUSINESS_SUCCESS = "POST_BUSINESS_SUCCESS";
export const POST_BUSINESS_FAILURE = "POST_BUSINESS_FAILURE";

export const fetchBusinesses = (business) => dispatch => {

  console.log("action business query", business);

  const name = business.name;
  let location;

  if (business.location) {
    location = `location=${business.location}`;
  } else if (business.latitude && business.longitude) {
    location = `latitude=${business.latitude}&longitude=${business.longitude}`;
  } else {
    dispatch({
      type: FETCH_BUSINESS_FAILURE,
      payload: "Business location required"
    });
  }

  const yelpSearchEndpoint = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${name}&${location}`;//I've tried like a million different solutions from Google to get this to work without a 403 and a CORS error, maybe someone else has ideas cause I give up
  dispatch({ type: FETCH_BUSINESS_START });
  axiosWithYelpAuth()
    .get(yelpSearchEndpoint)
    .then(res => {
      dispatch({
        type: FETCH_BUSINESS_SUCCESS,
        payload: res
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_BUSINESS_FAILURE,
        payload: err
      });
    });

};

export const postBusiness = ({ url, id }) => dispatch => {
  const dsEndpoint = ``; // TODO: GET ENDPOINT URL

  dispatch({ type: POST_BUSINESS_START });
  axios
    .post(dsEndpoint, { url, id })
    .then(res => {
      dispatch({
        type: POST_BUSINESS_SUCCESS,
        payload: res
      });
    })
    .catch(err => {
      dispatch({
        type: POST_BUSINESS_FAILURE,
        payload: err
      });
    });

};

export const searchResultsPlaceholder = (results) => dispatch => {

  console.log("searchResultsPlaceholder action working");

  dispatch({
    type: FETCH_BUSINESS_SUCCESS,
    payload: results
  })

};
