
export const privacyPageReducer = (state = {
    privacyloading: true,
    updateprivacyerror: null,
    privacydata: null,
    publishedprivacydata: null,
    privacyloading: true,
}, action) => {
    switch (action.type) {
        case "UPDATE_PRIVACYPAGE_REQUEST":
            return {
                privacyloading: false,
            };
        case "UPDATE_PRIVACYPAGE_SUCCESS":
            return {
                privacyloading: false,
                updateprivacyerror: action.payload,
            };
        case "UPDATE_PRIVACYPAGE_FAIL":
            return {
                privacyloading: false,
                updateprivacyerror: action.payload,
            };
        case "ALL_GETPUBLISHPRIVACYPAGE_REQUEST":
            return {
                ...state,
                privacyloading: true,
            };
        case "ALL_GETPUBLISHPRIVACYPAGE_SUCCESS":
            return {
                ...state,
                privacyloading: false,
                publishedprivacydata: action.payload
            };

        case "ALL_GETPUBLISHPRIVACYPAGE_FAIL":
            return {
                ...state,
                privacyloading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}

// export const privacyPageReducer = (state = { updateprivacyloading: true, updateprivacyerror: null, createloading: true, createerror: null, privacydata: null, publishedprivacydata: null, privacyloading: true, deleteloading: true, deleteerror: null }, action) => {
//     switch (action.type) {
//         case "CREATE_PRIVACYPAGE_REQUEST":
//             return {
//                 ...state,
//                 createloading: true,
//             };
//         case "CREATE_PRIVACYPAGE_SUCCESS":
//             return {
//                 ...state,
//                 createloading: false,
//             };
//         case "CREATE_PRIVACYPAGE_FAIL":
//             return {
//                 ...state,
//                 createloading: false,
//                 createerror: action.payload,
//             };
//         case "ALL_PRIVACYPAGE_REQUEST":
//             return {
//                 ...state
//                 , loading: true,
//                 privacydata: null,
//             };
//         case "ALL_PRIVACYPAGE_SUCCESS":
//             return {
//                 ...state,
//                 loading: false,
//                 privacydata: action.payload,
//             };

//         case "ALL_PRIVACYPAGE_FAIL":
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };
//         case "DELETE_PRIVACYPAGE_REQUEST":
//             return {
//                 ...state,
//                 deleteloading: true,

//             };
//         case "DELETE_PRIVACYPAGE_SUCCESS":
//             return {
//                 ...state,
//                 deleteloading: false,
//             };
//         case "DELETE_PRIVACYPAGE_FAIL":
//             return {
//                 ...state,
//                 deleteloading: false,
//                 deleteerror: action.payload,
//             };
//         case "UPDATE_PRIVACYPAGE_REQUEST":
//             return {
//                 updateprivacyloading: false,
//             };
//         case "UPDATE_PRIVACYPAGE_SUCCESS":
//             return {
//                 updateprivacyloading: false,
//                 updateprivacyerror: action.payload,
//             };
//         case "UPDATE_PRIVACYPAGE_FAIL":
//             return {
//                 updateprivacyloading: false,
//                 updateprivacyerror: action.payload,
//             };
//         case "ALL_PUBLISHPRIVACYPAGE_REQUEST":
//             return {
//                 ...state,
//                 loading: true,

//             };
//         case "ALL_PUBLISHPRIVACYPAGE_SUCCESS":
//             return {
//                 ...state,
//                 publishedprivacyloading: false,

//             };

//         case "ALL_PUBLISHPRIVACYPAGE_FAIL":
//             return {
//                 ...state,
//                 publishedprivacyloading: false,
//                 error: action.payload,
//             };
//         case "ALL_GETPUBLISHPRIVACYPAGE_REQUEST":
//             return {
//                 ...state,
//                 publishedprivacyloading: true,
//                 publishedprivacydata: null
//             };
//         case "ALL_GETPUBLISHPRIVACYPAGE_SUCCESS":
//             return {
//                 ...state,
//                 publishedprivacyloading: false,
//                 publishedprivacydata: action.payload
//             };

//         case "ALL_GETPUBLISHPRIVACYPAGE_FAIL":
//             return {
//                 ...state,
//                 publishedprivacyloading: false,
//                 error: action.payload,
//             };

//         default:
//             return state;
//     }
// }
