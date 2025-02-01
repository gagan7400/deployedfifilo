import axios from 'axios'
export const getjobs = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_JOBS_REQUEST" });
        const { data } = await axios.get('/admin/career/jobs');

        dispatch({
            type: "ALL_JOBS_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "ALL_JOBS_FAIL",
            payload: error.message,
        });
    }
};
export const deleteJob = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DELETE_JOBS_REQUEST" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        };
        const { data } = await axios.delete(`/admin/career/jobs/${id}`,
            config
        );

        dispatch({
            type: "DELETE_JOBS_SUCCESS",
            payload: data,
        });
        dispatch(getjobs());
    } catch (error) {
        dispatch({
            type: "DELETE_JOBS_FAIL",
            payload: error.message,
        });
    }
};

export const createjob = ({ Jobdata }) => async (dispatch) => {
    try {
        dispatch({ type: "CREATE_JOB_REQUEST" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        };
        const { data } = await axios.post('/admin/career/jobs',
            Jobdata,
            config
        );
        dispatch({
            type: "CREATE_JOB_SUCCESS",
            payload: data._id,
        });
        dispatch(getjobs())
    } catch (error) {
        dispatch({
            type: "CREATE_JOB_FAIL",
            payload: error,
        });
    }
};
export const updatejobAction = ({ Jobdata, id }) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_JOB_REQUEST" });
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        };
        const { data } = await axios.put(`/admin/career/job/${id}`,
            Jobdata,
            config
        );
        dispatch({
            type: "UPDATE_JOB_SUCCESS",
            payload: data._id,
        });
        dispatch(getjobs())
    } catch (error) {
        dispatch({
            type: "UPDATE_JOB_FAIL",
            payload: error,
        });
    }
};

const config = {
    headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
    }
};

// Helper function to handle errors
const handleError = (error, dispatch, failType) => {
    dispatch({
        type: failType,
        payload: error.response?.data?.message || error.message,
    });
};

// Fetch Career Page Data
export const getCareerPage = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_CAREERPAGE_REQUEST" });
        const { data } = await axios.get('/admin/career/getcareerpage');
        dispatch({ type: "ALL_CAREERPAGE_SUCCESS", payload: data });
    } catch (error) {
        handleError(error, dispatch, "ALL_CAREERPAGE_FAIL");
    }
};

// Publish Career Page
export const publishCareerPage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "ALL_PUBLISHCAREERPAGE_REQUEST" });
        await axios.put(`/admin/career/publishcareerpage/${id}`, {}, config);
        dispatch({ type: "ALL_PUBLISHCAREERPAGE_SUCCESS" });
        dispatch(getCareerPage());
    } catch (error) {
        handleError(error, dispatch, "ALL_PUBLISHCAREERPAGE_FAIL");
    }
};

// Fetch Published Career Page Data
export const getpublishCareerPage = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_GETPUBLISHCAREERPAGE_REQUEST" });
        const { data } = await axios.get('/admin/career/getpublishedcareerpage');
        dispatch({ type: "ALL_GETPUBLISHCAREERPAGE_SUCCESS", payload: data.data });
    } catch (error) {
        handleError(error, dispatch, "ALL_GETPUBLISHCAREERPAGE_FAIL");
    }
};

// Delete Career Page
export const deleteCareerPage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DELETE_CAREERPAGE_REQUEST" });
        await axios.delete(`/admin/career/deletecareerpage/${id}`, config);
        dispatch({ type: "DELETE_CAREERPAGE_SUCCESS" });
        dispatch(getCareerPage());
    } catch (error) {
        handleError(error, dispatch, "DELETE_CAREERPAGE_FAIL");
    }
};

// Update Career Page
export const updateCareerPageAction = ({ careerdata, id }) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_CAREERPAGE_REQUEST" });
        const multipartConfig = { ...config };
        await axios.put(`/admin/career/updatecareerpage/${id}`, careerdata, multipartConfig);
        dispatch({ type: "UPDATE_CAREERPAGE_SUCCESS" });
        dispatch(getCareerPage());
    } catch (error) {
        handleError(error, dispatch, "UPDATE_CAREERPAGE_FAIL");
    }
};
