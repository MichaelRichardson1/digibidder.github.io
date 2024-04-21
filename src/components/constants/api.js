export const BASE_URL = "https://v2.api.noroff.dev";
export const REGISTER_URL = BASE_URL + "/auth/register";
export const LOGIN_URL = BASE_URL + "/auth/login";
export const LISTINGS_URL = BASE_URL + "/auction/listings";
export const BIDS_URL = (id) => `${LISTINGS_URL}/${id}?_bids=true`;
export const PROFILE_URL = BASE_URL + "/auction/profiles";
export const CREDITS_URL = BASE_URL + "/auction/profiles";
export const APIKEY_URL = BASE_URL + "/auth/create-api-key";
export const PLACE_BID_URL = (id) => `${LISTINGS_URL}/${id}/bids`;