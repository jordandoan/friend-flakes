export const LOGGING_IN = "LOGGING_IN";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS ="LOGIN_SUCCESS";
export const NO_ERROR = "NO_ERROR";

export const logInUser = (user) => {
  if (user.username !== "test" || user.password !== "password") {
    return {type: LOGIN_FAILURE, payload: "Incorrect username and password"}
  } else {
    return {type: LOGIN_SUCCESS}
  }
}

export const resetError = () => {
  return {type: NO_ERROR}
}