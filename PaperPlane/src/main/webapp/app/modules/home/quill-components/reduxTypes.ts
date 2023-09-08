// src/reduxTypes.ts

// Define a type for the authentication state
export interface AuthenticationState {
  isAuthenticated: boolean;
  // Other authentication-related properties
}

// Define a type for the user state
export interface UserState {
  role: string;
  // Other user-related properties
}
