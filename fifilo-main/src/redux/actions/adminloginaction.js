import axios from "axios";
// Login 
export const loaduser = () => async (dispatch) => {
  dispatch({ type: "LOAD_USER" })
}
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    const config = { headers: { "Content-Type": "application/json" } };
    await fetch("/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => res.json()).then((result) => {
      if (result.success) {
        localStorage.setItem("token", result.token)
        dispatch({ type: "LOGIN_SUCCESS", payload: result });
      } else {
        dispatch({ type: "LOGIN_FAIL", payload: result.message })
      }
    }).catch((err) => {
      dispatch({ type: "LOGIN_FAIL", payload: err.message })
    })
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOGOUT_SUCCESS" });
};
