
export const contactReducer = (state = { loading: false, success: false }, action) => {
    switch (action.type) {
        case "CONTACT_REQUEST":
            return {
                ...state,
                loading: true,
                success: false
            }
        case "CONTACT_SUCCESS":
            return {
                ...state,
                loading: false,
                success: true,
                contactdetails: action.payload
            };

        case "CONTACT_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };
        default:
            return state;
    }
};


export const contactPageReducer = (state = {
    contactdata: null,
    updatecontactloading: true,
    updatecontacterror: null,
    publishedcontactdata: null,
    publishedcontactloading: true,
    deleteloading: true,
    deleteerror: null
}, action) => {
    switch (action.type) {
        case "ALL_CONTACTPAGE_REQUEST":
            return {
                ...state
                , loading: true,
                contactdata: null,
            };
        case "ALL_CONTACTPAGE_SUCCESS":
            return {
                ...state,
                loading: false,
                contactdata: action.payload,
            };

        case "ALL_CONTACTPAGE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "DELETE_CONTACTPAGE_REQUEST":
            return {
                ...state,
                deleteloading: true,

            };
        case "DELETE_CONTACTPAGE_SUCCESS":
            return {
                ...state,
                deleteloading: false,
            };
        case "DELETE_CONTACTPAGE_FAIL":
            return {
                ...state,
                deleteloading: false,
                deleteerror: action.payload,
            };
        case "UPDATE_CONTACTPAGE_REQUEST":
            return {
                updatecontactloading: true,
            };
        case "UPDATE_CONTACTPAGE_SUCCESS":
            return {
                updatecontactloading: false,

            };
        case "UPDATE_CONTACTPAGE_FAIL":
            return {
                updatecontactloading: false,
                updatecontacterror: action.payload,
            };
        case "ALL_PUBLISHCONTACTPAGE_REQUEST":
            return {
                ...state,
                publishedcontactloading: true,

            };
        case "ALL_PUBLISHCONTACTPAGE_SUCCESS":
            return {
                ...state,
                publishedcontactloading: false,
            };

        case "ALL_PUBLISHCONTACTPAGE_FAIL":
            return {
                ...state,
                publishedcontactloading: false,
                error: action.payload,
            };
        case "ALL_GETPUBLISHCONTACTPAGE_REQUEST":
            return {
                ...state,
                publishedcontactloading: true,
                publishedcontactdata: null
            };
        case "ALL_GETPUBLISHCONTACTPAGE_SUCCESS":
            return {
                ...state,
                publishedcontactloading: false,
                publishedcontactdata: action.payload
            };

        case "ALL_GETPUBLISHCONTACTPAGE_FAIL":
            return {
                ...state,
                publishedcontactloading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}
