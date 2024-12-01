// src/helpers/authHelpers.js
export const isLoggedIn = () => {
  const authToken = localStorage.getItem("authToken");
  return !!authToken; // Returns true if authToken exists, false otherwise
};
