import axios from 'axios'

// export const createPrivacyPage = ({ heroSection, content }) => async (dispatch) => {
//     try {
//         dispatch({ type: "CREATE_PRIVACYPAGE_REQUEST" });
//         await fetch("/admin/privacy/createprivacypage", {
//             method: 'POST',
//             body: JSON.stringify({ heroSection, content }),
//             headers: {
//                 "Content-Type": "application/json",
//                 "x-auth-token": localStorage.getItem("token")
//             }
//         }).then((r) => r.json()).then((res) => {
//             dispatch({
//                 type: "CREATE_PRIVACYPAGE_SUCCESS",
//                 payload: res._id,
//             });

//         }).catch((err) => {
//             dispatch({
//                 type: "CREATE_PRIVACYPAGE_FAIL",
//                 payload: err.message,
//             });
//         })
//     } catch (error) {
//         dispatch({
//             type: "CREATE_PRIVACYPAGE_FAIL",
//             payload: error.message,
//         });
//     }
// };

// privacypage 
// export const getPrivacyPage = () => async (dispatch) => {
//     try {
//         dispatch({ type: "ALL_PRIVACYPAGE_REQUEST" });
//         const { data } = await axios.get('/admin/privacy/getprivacypage');
//         if (data.success) {
//             dispatch({
//                 type: "ALL_PRIVACYPAGE_SUCCESS",
//                 payload: data.data,
//             });
//         } else {
//             dispatch({
//                 type: "ALL_PRIVACYPAGE_FAIL",
//                 payload: data.message,
//             });
//         }
//     } catch (error) {
//         dispatch({
//             type: "ALL_PRIVACYPAGE_FAIL",
//             payload: error.message,
//         });
//     }
// };
// export const publishPrivacyPage = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: "ALL_PUBLISHPRIVACYPAGE_REQUEST" });
//         const config = {
//             headers: {
//                 "Content-Type": "application/json",
//                 "x-auth-token": localStorage.getItem("token")
//             }
//         };

//         const { data } = await axios.put(`/admin/privacy/publishprivacypage/${id}`, {}, config);
//         if (data.success) {
//             dispatch({
//                 type: "ALL_PUBLISHPRIVACYPAGE_SUCCESS",
//                 payload: data,
//             });
//             dispatch(getPrivacyPage())
//         } else {
//             dispatch({
//                 type: "ALL_PUBLISHPRIVACYPAGE_FAIL",
//                 payload: data.message,
//             });
//         }
//     } catch (error) {
//         dispatch({
//             type: "ALL_PUBLISHPRIVACYPAGE_FAIL",
//             payload: error.message,
//         });
//     }
// };
export const getPublishPrivacyPage = () => async (dispatch) => {

    try {
        dispatch({ type: "ALL_GETPUBLISHPRIVACYPAGE_REQUEST" });

        const { data } = await axios.get('/admin/privacy/getpublishedprivacypage');

        if (data.success) {
            dispatch({
                type: "ALL_GETPUBLISHPRIVACYPAGE_SUCCESS",
                payload: data.data,
            });
        } else {
            dispatch({
                type: "ALL_GETPUBLISHPRIVACYPAGE_FAIL",
                payload: data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: "ALL_GETPUBLISHPRIVACYPAGE_FAIL",
            payload: error.message,
        });
    }
};
// export const deleteprivacyPage = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: "DELETE_PRIVACYPAGE_REQUEST" });
//         const config = {
//             headers: {
//                 "x-auth-token": localStorage.getItem("token")
//             }
//         };
//         const { data } = await axios.delete(`/admin/privacy/deleteprivacypage/${id}`, config);
//         if (data.success) {

//             await dispatch({
//                 type: "DELETE_PRIVACYPAGE_SUCCESS",
//                 payload: data.data,
//             });
//             dispatch(getPrivacyPage());
//         } else {
//             dispatch({
//                 type: "DELETE_PRIVACYPAGE_FAIL",
//                 payload: data.message,
//             });
//         }
//     } catch (error) {
//         dispatch({
//             type: "DELETE_PRIVACYPAGE_FAIL",
//             payload: error.message,
//         });
//     }
// };

export const updatePrivacyAction = ({ privacyData, id }) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_PRIVACYPAGE_REQUEST" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        };
        const { data } = await axios.put(`/admin/privacy/updateprivacypage/${id}`,
            privacyData,
            config
        );
        if (data.success) {
            dispatch({
                type: "UPDATE_PRIVACYPAGE_SUCCESS",
                payload: data._id,
            });
            dispatch(getPublishPrivacyPage())
        } else {
            dispatch({
                type: "UPDATE_PRIVACYPAGE_FAIL",
                payload: data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: "UPDATE_PRIVACYPAGE_FAIL",
            payload: error.message,
        });
    }
};