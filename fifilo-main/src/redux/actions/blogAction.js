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
export const createBlog = ({ heroSection, seoSection }) => async (dispatch) => {
    try {
        dispatch({ type: "CREATE_BLOG_REQUEST" });
        await fetch("/admin/blogs/createblog", {
            method: 'POST',
            body: JSON.stringify({ heroSection, seoSection }),
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        }).then((r) => r.json()).then((res) => {
            dispatch({
                type: "CREATE_BLOG_SUCCESS",
                payload: res._id,
            });

        }).catch((err) => {
            console.log(err)
            dispatch({
                type: "CREATE_BLOG_FAIL",
                payload: err,
            });
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: "CREATE_BLOG_FAIL",
            payload: error,
        });
    }
};
// Fetch casestudy Page Data
export const getBlogs = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_BLOG_REQUEST" });
        const { data } = await axios.get('/admin/blogs/getblogs');
        dispatch({ type: "ALL_BLOG_SUCCESS", payload: data });
    } catch (error) {
        handleError(error, dispatch, "ALL_BLOG_FAIL");
    }
};

// Delete casestudy Page
export const deleteBlog = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DELETE_BLOG_REQUEST" });
        await axios.delete(`/admin/blogs/deleteblog/${id}`, config);
        dispatch({ type: "DELETE_BLOG_SUCCESS" });
        dispatch(getBlogs());
    } catch (error) {
        handleError(error, dispatch, "DELETE_BLOG_FAIL");
    }
};

// Update casestudy Page
export const updateBlogAction = ({ casestudydata, id }) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_BLOG_REQUEST" });
        const multipartConfig = { ...config };
        await axios.put(`/admin/blogs/updateblog/${id}`, casestudydata, multipartConfig);
        dispatch({ type: "UPDATE_BLOG_SUCCESS" });
        dispatch(getBlogs());
    } catch (error) {
        handleError(error, dispatch, "UPDATE_BLOG_FAIL");
    }
};
