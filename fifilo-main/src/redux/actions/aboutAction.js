import axios from 'axios';

// Helper function for headers configuration
const getAuthConfig = (isMultipart = false) => ({
    headers: {
        "x-auth-token": localStorage.getItem("token"),
        ...(isMultipart && { "Content-Type": "multipart/form-data" }),
        ...(!isMultipart && { "Content-Type": "application/json" }),
    },
});

// Optimized Actions

export const getAboutPage = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_ABOUTPAGE_REQUEST" });
        const { data } = await axios.get('http://localhost:5000/admin/about/getaboutpage');
        if (data.success) {
            dispatch({ type: "ALL_ABOUTPAGE_SUCCESS", payload: data.data });
        } else {
            dispatch({ type: "ALL_ABOUTPAGE_FAIL", payload: data });
        }
    } catch (error) {
        dispatch({ type: "ALL_ABOUTPAGE_FAIL", payload: error.message });
    }
};

export const publishAboutPage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "ALL_PUBLISHABOUTPAGE_REQUEST" });
        const { data } = await axios.put(
            `http://localhost:5000/admin/about/publishaboutpage/${id}`,
            {},
            getAuthConfig()
        );
        if (data.success) {
            dispatch({ type: "ALL_PUBLISHABOUTPAGE_SUCCESS", payload: data });
            dispatch(getAboutPage());
        } else {
            dispatch({ type: "ALL_PUBLISHABOUTPAGE_FAIL", payload: data });
        }
    } catch (error) {
        dispatch({ type: "ALL_PUBLISHABOUTPAGE_FAIL", payload: error.message });
    }
};

export const getPublishAboutPage = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_GETPUBLISHABOUTPAGE_REQUEST" });
        const { data } = await axios.get('http://localhost:5000/admin/about/getpublishedaboutpage');
        if (data.success) {
            dispatch({ type: "ALL_GETPUBLISHABOUTPAGE_SUCCESS", payload: data.data });
        } else {
            dispatch({ type: "ALL_GETPUBLISHABOUTPAGE_FAIL", payload: data });
        }
    } catch (error) {
        dispatch({ type: "ALL_GETPUBLISHABOUTPAGE_FAIL", payload: error.message });
    }
};

export const deleteAboutPage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DELETE_ABOUTPAGE_REQUEST" });
        const { data } = await axios.delete(
            `http://localhost:5000/admin/about/deleteaboutpage/${id}`,
            getAuthConfig()
        );
        if (data.success) {
            dispatch({ type: "DELETE_ABOUTPAGE_SUCCESS", payload: id });
        } else {
            dispatch({ type: "DELETE_ABOUTPAGE_FAIL", payload: data });
        }
    } catch (error) {
        dispatch({ type: "DELETE_ABOUTPAGE_FAIL", payload: error.message });
    }
};

export const updateAboutPageAction = ({ aboutData, id }) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_ABOUTPAGE_REQUEST" });
        const { data } = await axios.put(
            `http://localhost:5000/admin/about/updateaboutpage/${id}`,
            aboutData,
            getAuthConfig(false)
        );
        if (data.success) {
            dispatch({ type: "UPDATE_ABOUTPAGE_SUCCESS", payload: data._id });
            dispatch(getAboutPage());
        } else {
            dispatch({ type: "UPDATE_ABOUTPAGE_FAIL", payload: data });
        }
    } catch (error) {
        dispatch({ type: "UPDATE_ABOUTPAGE_FAIL", payload: error.message });
    }
};
