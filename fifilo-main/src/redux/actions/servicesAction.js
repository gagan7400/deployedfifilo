import axios from 'axios';

const config = {
    headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
    }
};

const handleError = (error) => error.response?.data?.message || error.message;

// Get Services
export const getServicePage = () => async (dispatch) => {
    try {
        dispatch({ type: "GET_SERVICE_REQUEST" });
        const { data } = await axios.get('/admin/services/getservice');
        dispatch({ type: "GET_SERVICE_SUCCESS", payload: data.data });
    } catch (error) {
        dispatch({ type: "GET_SERVICE_FAIL", payload: handleError(error) });
    }
};

// Create Service
export const createServicePage = (serviceData) => async (dispatch) => {
    try {
        dispatch({ type: "CREATE_SERVICEPAGE_REQUEST" });
        const { data } = await axios.post('/admin/services/createservice', serviceData, config);
        dispatch({ type: "CREATE_SERVICEPAGE_SUCCESS", payload: data.data });
    } catch (error) {
        dispatch({ type: "CREATE_SERVICEPAGE_FAIL", payload: handleError(error) });
    }
};

// Publish Service
export const publishServicePage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "PUBLISH_SERVICEPAGE_REQUEST" });
        const { data } = await axios.put(`/admin/services/publishservice/${id}`, {}, config);
        dispatch({ type: "PUBLISH_SERVICEPAGE_SUCCESS", payload: data.data });
        dispatch(getServicePage())
    } catch (error) {
        dispatch({ type: "PUBLISH_SERVICEPAGE_FAIL", payload: handleError(error) });
    }
};

// Get Published Service
export const getpublishServicePage = () => async (dispatch) => {
    try {
        dispatch({ type: "GET_SERVICEPUBLISH_REQUEST" });
        const { data } = await axios.get('/admin/services/getpublishedservice');
        dispatch({ type: "GET_SERVICEPUBLISH_SUCCESS", payload: data.data });
    } catch (error) {
        dispatch({ type: "GET_SERVICEPUBLISH_FAIL", payload: handleError(error) });
    }
};

// Delete Service
export const deleteServicePage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DELETE_SERVICEPAGE_REQUEST" });
        await axios.delete(`/admin/services/deleteservice/${id}`, config);
        dispatch({ type: "DELETE_SERVICEPAGE_SUCCESS", payload: id });
    } catch (error) {
        dispatch({ type: "DELETE_SERVICEPAGE_FAIL", payload: handleError(error) });
    }
};

// Update Service
export const updateServicePageAction = ({ servicedata, id }) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_SERVICEPAGE_REQUEST" });
        const { data } = await axios.put(`/admin/services/updateservicepage/${id}`, servicedata, {
            ...config,
            headers: { ...config.headers, "Content-Type": "application/json" }
        });
        dispatch({ type: "UPDATE_SERVICEPAGE_SUCCESS", payload: data._id });
    } catch (error) {
        dispatch({ type: "UPDATE_SERVICEPAGE_FAIL", payload: handleError(error) });
    }
};
