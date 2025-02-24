import axios from 'axios'
const config = {
    headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
    }
};

// Helper function to handle errors
const handleError = (error, dispatch, failType) => {
    dispatch({ type: failType, payload: error.response?.data?.message || error.message, });
};
export const createCasestudyPage = ({ heroSection, seoSection }) => async (dispatch) => {
    try {
        dispatch({ type: "CREATE_CASESTUDYPAGE_REQUEST" });
        await fetch("/admin/casestudy/createcasestudypage", {
            method: 'POST',
            body: JSON.stringify({ heroSection, seoSection }),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        }).then((r) => r.json()).then((res) => {
            dispatch({
                type: "CREATE_CASESTUDYPAGE_SUCCESS",
                payload: res._id,
            });

        }).catch((err) => {
            console.log(err)
            dispatch({
                type: "CREATE_CASESTUDYPAGE_FAIL",
                payload: err,
            });
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: "CREATE_CASESTUDYPAGE_FAIL",
            payload: error,
        });
    }
};
// Fetch casestudy Page Data
export const getCasestudyPage = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_CASESTUDYPAGE_REQUEST" });
        const { data } = await axios.get('/admin/casestudy/getcasestudypage');
        dispatch({ type: "ALL_CASESTUDYPAGE_SUCCESS", payload: data });
    } catch (error) {
        handleError(error, dispatch, "ALL_CASESTUDYPAGE_FAIL");
    }
};

// Publish casestudy Page
export const publishcasestudyPage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "ALL_PUBLISHCASESTUDYPAGE_REQUEST" });
        await axios.put(`/admin/casestudy/publishcasestudypage/${id}`, {}, config);
        dispatch({ type: "ALL_PUBLISHCASESTUDYPAGE_SUCCESS" });
        dispatch(getCasestudyPage());
    } catch (error) {
        handleError(error, dispatch, "ALL_PUBLISHCASESTUDYPAGE_FAIL");
    }
};

// Fetch Published casestudy Page Data
export const getPublishCasestudyPage = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_GETPUBLISHCASESTUDYPAGE_REQUEST" });
        const { data } = await axios.get('/admin/casestudy/getpublishedcasestudypage');
        dispatch({ type: "ALL_GETPUBLISHCASESTUDYPAGE_SUCCESS", payload: data.data });
    } catch (error) {
        handleError(error, dispatch, "ALL_GETPUBLISHCASESTUDYPAGE_FAIL");
    }
};

// Delete casestudy Page
export const deleteCasestudyPage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DELETE_CASESTUDYPAGE_REQUEST" });
        await axios.delete(`/admin/casestudy/deletecasestudypage/${id}`, config);
        dispatch({ type: "DELETE_CASESTUDYPAGE_SUCCESS" });
        dispatch(getCasestudyPage());
    } catch (error) {
        handleError(error, dispatch, "DELETE_CASESTUDYPAGE_FAIL");
    }
};

// Update casestudy Page
export const updateCasestudyPageAction = ({ casestudydata, id }) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_CASESTUDYPAGE_REQUEST" });
        const multipartConfig = { ...config };
        await axios.put(`/admin/casestudy/updatecasestudypage/${id}`, casestudydata, multipartConfig);
        dispatch({ type: "UPDATE_CASESTUDYPAGE_SUCCESS" });
        dispatch(getCasestudyPage());
    } catch (error) {
        handleError(error, dispatch, "UPDATE_CASESTUDYPAGE_FAIL");
    }
};

export const getCaseStudies = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_GETCASESTUDIES_REQUEST" });
        const { data } = await axios.get('/admin/casestudy/getcasestudy');
        dispatch({ type: "ALL_GETCASESTUDIES_SUCCESS", payload: data.data });
    } catch (error) {
        handleError(error, dispatch, "ALL_GETCASESTUDIES_FAIL");
    }
};