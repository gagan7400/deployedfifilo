import axios from 'axios';
// Get Homepage Action
export const getHomePage = () => async (dispatch) => {
    try {
        dispatch({ type: "HOMEPAGE_REQUEST" });
        const { data } = await axios.get('/admin/homepage/gethomepage');
        dispatch({ type: "HOMEPAGE_SUCCESS", payload: data.data });
    } catch (error) {
        dispatch({ type: "HOMEPAGE_FAIL", payload: error.response?.data?.message || error.message });
    }
};

// Delete Homepage Action
export const deleteHomePage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DELETE_HOMEPAGE_REQUEST" });
        const config = {
            headers: { "x-auth-token": localStorage.getItem("token") }
        };
        await axios.delete(`/admin/homepage/deletehomepage/${id}`, config);
        dispatch({ type: "DELETE_HOMEPAGE_SUCCESS", payload: id });
    } catch (error) {
        dispatch({ type: "DELETE_HOMEPAGE_FAIL", payload: error.response?.data?.message || error.message });
    }
};

// Create Homepage Action
export const createHomePage = (homePageData) => async (dispatch) => {
    try {
        dispatch({ type: "CREATE_HOMEPAGE_REQUEST" });
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-auth-token": localStorage.getItem("token")
            }
        };
        const { data } = await axios.post('/admin/homepage/createhomepage', homePageData, config);
        dispatch({ type: "CREATE_HOMEPAGE_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "CREATE_HOMEPAGE_FAIL", payload: error.response?.data?.message || error.message });
    }
};

// Publish Homepage Action
export const publishHomePage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "PUBLISH_HOMEPAGE_REQUEST" });
        const config = {
            headers: { "x-auth-token": localStorage.getItem("token") }
        };
        const { data } = await axios.put(`/admin/homepage/publishhomepage/${id}`, {}, config);
        dispatch({ type: "PUBLISH_HOMEPAGE_SUCCESS", payload: data });
        dispatch(getHomePage())
        // You can update state directly instead of refetching if possible
    } catch (error) {
        dispatch({ type: "PUBLISH_HOMEPAGE_FAIL", payload: error.response?.data?.message || error.message });
    }
};

// Get Published Homepage Action
export const getpublishHomePage = () => async (dispatch) => {
    try {
        dispatch({ type: "GET_HOMEPAGEPUBLISH_REQUEST" });
        const { data } = await axios.get('/admin/homepage/getpublishedhomepage');
        await dispatch({ type: "GET_HOMEPAGEPUBLISH_SUCCESS", payload: data.data });
    } catch (error) {
        dispatch({ type: "GET_HOMEPAGEPUBLISH_FAIL", payload: error.response?.data?.message || error.message });
    }
};

// Update Homepage Action
export const updateHomePageAction = ({ homedata, id }) => async (dispatch) => {
    try {
        const config = {
            headers: { "Content-Type": "application/json", "x-auth-token": localStorage.getItem("token"), }
        };
        const { data } = await axios.put(`/admin/homepage/updatehomepage/${id}`, homedata, config);

        dispatch({ type: "UPDATE_HOMEPAGE_SUCCESS", payload: data });

    } catch (error) {
        dispatch({ type: "UPDATE_HOMEPAGE_FAIL", payload: error.response?.data?.message || error.message });
    }
};

