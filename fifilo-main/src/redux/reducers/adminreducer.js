let init = {
    user: {
        loading: true,
        isAuthenticated: false,
    }
}
export const userReducer = (state = init, action) => {
    switch (action.type) {
        case "LOAD_USER":
            let token = localStorage.getItem("token");
            return {
                loading: token ? false : true,
                isAuthenticated: token ? true : false,
            };
        case "LOGIN_REQUEST":
            return {
                loading: true,
                isAuthenticated: false,
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };

        case "LOGOUT_SUCCESS":
            localStorage.clear();
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            };
        case "LOGIN_FAIL":
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };

        case "LOGOUT_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};