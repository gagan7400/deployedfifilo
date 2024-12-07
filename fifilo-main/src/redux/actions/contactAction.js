import axios from 'axios'
export const contactus = (Contactdata) => async (dispatch) => {
    try {
        dispatch({ type: "CONTACT_REQUEST" })
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        };
        const { data } = await axios.post('http://localhost:5000/admin/contactus',
            Contactdata,
            config
        );
        dispatch({
            type: "CONTACT_SUCCESS",
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: "CONTACT_FAIL",
            payload: error,
        });
    }
}


export const getContactPage = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_CONTACTPAGE_REQUEST" });
        const { data } = await axios.get('http://localhost:5000/admin/contactus/getcontactpage');
        dispatch({
            type: "ALL_CONTACTPAGE_SUCCESS",
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: "ALL_CONTACTPAGE_FAIL",
            payload: error.message,
        });
    }
};
export const publishContactPage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "ALL_PUBLISHCONTACTPAGE_REQUEST" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        };

        const { data } = await axios.put(`http://localhost:5000/admin/contactus/publishcontactpage/${id}`, {}, config);
        dispatch({
            type: "ALL_PUBLISHCONTACTPAGE_SUCCESS",
            payload: data,
        });
        dispatch(getContactPage())
    } catch (error) {
        dispatch({
            type: "ALL_PUBLISHCONTACTPAGE_FAIL",
            payload: error.message,
        });
    }
};
export const getPublishContactPage = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_GETPUBLISHCONTACTPAGE_REQUEST" });

        const { data } = await axios.get('http://localhost:5000/admin/contactus/getpublishedcontactpage');

        dispatch({
            type: "ALL_GETPUBLISHCONTACTPAGE_SUCCESS",
            payload: data.data,
        });
        dispatch(getContactPage())
    } catch (error) {
        dispatch({
            type: "ALL_GETPUBLISHCONTACTPAGE_FAIL",
            payload: error.message,
        });
    }
};

export const deleteContactPage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DELETE_CONTACTPAGE_REQUEST" });
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        };
        const { data } = await axios.delete(`http://localhost:5000/admin/contactus/deletecontactpage/${id}`, config);
        await dispatch({
            type: "DELETE_CONTACTPAGE_SUCCESS",
            payload: data.data,
        });
        dispatch(getContactPage());
    } catch (error) {
        dispatch({
            type: "DELETE_CONTACTPAGE_FAIL",
            payload: error.message,
        });
    }
};

export const updateContactPageAction = ({ contactPageData, id }) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_CONTACTPAGE_REQUEST" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        };
        const { data } = await axios.put(`http://localhost:5000/admin/contactus/updatecontactpage/${id}`,
            contactPageData,
            config
        );
        dispatch({
            type: "UPDATE_CONTACTPAGE_SUCCESS",
            payload: data._id,
        });
        dispatch(getContactPage())
    } catch (error) {
        dispatch({
            type: "UPDATE_CONTACTPAGE_FAIL",
            payload: error,
        });
    }
};