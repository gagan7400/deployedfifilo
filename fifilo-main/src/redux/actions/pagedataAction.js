export const pageAction = (data) => async (dispatch) => {
    dispatch({ type: "PAGEDATA", payload: { ...data } });

};
