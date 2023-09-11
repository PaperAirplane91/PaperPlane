// src/reducers/authenticationReducer.ts

import { AuthenticationState } from './reduxTypes';

const initialState: AuthenticationState = {
  isAuthenticated: false,
  // Other authentication-related properties
};

const authenticationReducer = (state = initialState, action) => {
  // Reducer logic here
};

export default authenticationReducer;
