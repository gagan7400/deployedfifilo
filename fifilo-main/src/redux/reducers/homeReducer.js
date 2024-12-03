export const homePageReducer = (state = {
    homeloading: false,
    homedata: null,
    publishedhomepage: null,
    publisherror: null,
    error: null
}, action) => {
    switch (action.type) {
        case "HOMEPAGE_REQUEST":
        case "CREATE_HOMEPAGE_REQUEST":
        case "PUBLISH_HOMEPAGE_REQUEST":
        case "GET_HOMEPAGEPUBLISH_REQUEST":
        case "UPDATE_HOMEPAGE_REQUEST":
        case "DELETE_HOMEPAGE_REQUEST":
            return {
                ...state,
                homeloading: true,
                error: null,
                publisherror: null,
            };
        case "HOMEPAGE_SUCCESS":
            return {
                ...state,
                homeloading: false,
                homedata: action.payload,
            };
        case "HOMEPAGE_FAIL":
        case "CREATE_HOMEPAGE_FAIL":
        case "PUBLISH_HOMEPAGE_FAIL":
        case "GET_HOMEPAGEPUBLISH_FAIL":
        case "UPDATE_HOMEPAGE_FAIL":
        case "DELETE_HOMEPAGE_FAIL":
            return {
                ...state,
                homeloading: false,
                error: action.payload,
            };
        case "DELETE_HOMEPAGE_SUCCESS":
            return {
                ...state,
                homeloading: false,
                homedata: state.homedata.filter(home => home._id !== action.payload),
            };
        case "CREATE_HOMEPAGE_SUCCESS":
            return {
                ...state,
                homeloading: false,
                homedata: [...state.homedata, action.payload], // Adding new homepage to state
            };
        case "UPDATE_HOMEPAGE_SUCCESS":
            return {
                ...state,
                homeloading: false,
                homedata: state.homedata.map(home => home._id === action.payload._id ? action.payload : home), // Updating homepage in state
            };
        case "PUBLISH_HOMEPAGE_SUCCESS":
            return {
                ...state,
                homeloading: false,
                publishedhomepage: action.payload,
            };
        case "OPENHOMEPAGE":
            return {
                ...state,
                openhomepage: action.payload,
            };
        case "GET_HOMEPAGEPUBLISH_SUCCESS":
            return {
                ...state,
                homeloading: false,
                publishedhomepage: action.payload,
            };
        default:
            return state;
    }
};
