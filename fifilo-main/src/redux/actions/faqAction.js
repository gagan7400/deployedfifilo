import axios from 'axios'

export const createFaqPage = ({ heroSection, faqSection }) => async (dispatch) => {
    try {
        dispatch({ type: "CREATE_FAQPAGE_REQUEST" });
        await fetch("/admin/faq/createfaqpage", {
            method: 'POST',
            body: JSON.stringify({ heroSection, faqSection }),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        }).then((r) => r.json()).then((res) => {
            dispatch({
                type: "CREATE_FAQPAGE_SUCCESS",
                payload: res._id,
            });

        }).catch((err) => {
            dispatch({
                type: "CREATE_FAQPAGE_FAIL",
                payload: err.message,
            });
        })
    } catch (error) {
        dispatch({
            type: "CREATE_FAQPAGE_FAIL",
            payload: error.message,
        });
    }
};

// faqpage 
export const getFaqPage = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_FAQPAGE_REQUEST" });
        const { data } = await axios.get('/admin/faq/getfaqpage');
        if (data.success) {
            dispatch({
                type: "ALL_FAQPAGE_SUCCESS",
                payload: data.data,
            });
        } else {
            dispatch({
                type: "ALL_FAQPAGE_FAIL",
                payload: data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: "ALL_FAQPAGE_FAIL",
            payload: error.message,
        });
    }
};
export const publishFaqPage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "ALL_PUBLISHFAQPAGE_REQUEST" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        };

        const { data } = await axios.put(`/admin/faq/publishfaqpage/${id}`, {}, config);
        if (data.success) {
            dispatch({
                type: "ALL_PUBLISHFAQPAGE_SUCCESS",
                payload: data,
            });
            dispatch(getFaqPage())
        } else {
            dispatch({
                type: "ALL_PUBLISHFAQPAGE_FAIL",
                payload: data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: "ALL_PUBLISHFAQPAGE_FAIL",
            payload: error.message,
        });
    }
};
export const getPublishFaqPage = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_GETPUBLISHFAQPAGE_REQUEST" });

        const { data } = await axios.get('/admin/faq/getpublishedfaqpage');

        if (data.success) {

            dispatch({
                type: "ALL_GETPUBLISHFAQPAGE_SUCCESS",
                payload: data.data,
            });
        } else {
            dispatch({
                type: "ALL_GETPUBLISHFAQPAGE_FAIL",
                payload: data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: "ALL_GETPUBLISHFAQPAGE_FAIL",
            payload: error.message,
        });
    }
};
export const deletefaqPage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DELETE_FAQPAGE_REQUEST" });
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        };
        const { data } = await axios.delete(`/admin/faq/deletefaqpage/${id}`, config);
        if (data.success) {

            await dispatch({
                type: "DELETE_FAQPAGE_SUCCESS",
                payload: data.data,
            });
            dispatch(getFaqPage());
        } else {
            dispatch({
                type: "DELETE_FAQPAGE_FAIL",
                payload: data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: "DELETE_FAQPAGE_FAIL",
            payload: error.message,
        });
    }
};

export const updateFaqAction = ({ faqData, id }) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_FAQPAGE_REQUEST" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        };
        const { data } = await axios.put(`/admin/faq/updatefaqpage/${id}`,
            faqData,
            config
        );
        if (data.success) {
            dispatch({
                type: "UPDATE_FAQPAGE_SUCCESS",
                payload: data._id,
            });
            dispatch(getPublishFaqPage())
        } else {
            dispatch({
                type: "UPDATE_FAQPAGE_FAIL",
                payload: data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: "UPDATE_FAQPAGE_FAIL",
            payload: error.message,
        });
    }
};