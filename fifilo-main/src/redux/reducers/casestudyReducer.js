export const casestudyReducer = (state = {
    casestudyloading: true,
    error: null,
    casestudydata: null,
    publishedcasestudydata: null,
    updatecasestudyloading: true,
    deleteloading: true,
    casestudies: null
}, action) => {
    switch (action.type) {
        case "ALL_CASESTUDYPAGE_REQUEST":
        case "ALL_PUBLISHCASESTUDYPAGE_REQUEST":
        case "ALL_GETPUBLISHCASESTUDYPAGE_REQUEST":
        case "CREATE_CASESTUDYPAGE_REQUEST":
        case "DELETE_CASESTUDYPAGE_REQUEST":
        case "UPDATE_CASESTUDYPAGE_REQUEST":
        case "ALL_GETCASESTUDIES_REQUEST":

            return { ...state, casestudyloading: true, error: null };

        case "ALL_CASESTUDYPAGE_SUCCESS":
            return { ...state, casestudyloading: false, casestudydata: action.payload.data };
        case "CREATE_CASESTUDYPAGE_SUCCESS":
            return { ...state, casestudyloading: false, };

        case "ALL_PUBLISHCASESTUDYPAGE_SUCCESS":
            return { ...state, casestudyloading: false };
        case "ALL_GETPUBLISHCASESTUDYPAGE_SUCCESS":
            return { ...state, casestudyloading: false, publishedcasestudydata: action.payload };
        // casestudies success case
        case "ALL_GETCASESTUDIES_SUCCESS":
            return { ...state, casestudyloading: false, casestudies: action.payload };

        case "DELETE_CASESTUDYPAGE_SUCCESS":
            return { ...state, casestudyloading: false, deleteloading: false };

        case "UPDATE_CASESTUDYPAGE_SUCCESS":
            return { ...state, casestudyloading: false, updatecasestudyloading: false };

        case "ALL_CASESTUDYPAGE_FAIL":
        case "CREATE_CASESTUDYPAGE_FAIL":
        case "ALL_PUBLISHCASESTUDYPAGE_FAIL":
        case "ALL_GETPUBLISHCASESTUDYPAGE_FAIL":
        case "DELETE_CASESTUDYPAGE_FAIL":
        case "UPDATE_CASESTUDYPAGE_FAIL":
        case "ALL_GETCASESTUDIES_FAIL":
            return { ...state, casestudyloading: false, error: action.payload };

        default:
            return state;
    }
};
