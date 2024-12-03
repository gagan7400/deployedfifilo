export const jobsReducer = (state = { jobs: [], updateloading: true, updateerror: null }, action) => {
    switch (action.type) {
        case "ALL_JOB_REQUEST":
            return {
                jobloading: true,
            };
        case "ALL_JOBS_SUCCESS":
            return {
                jobloading: false,
                jobs: action.payload.data,
            };
        case "ALL_JOBS_FAIL":
            return {
                jobloading: false,
                error: action.payload,
            };
        case "UPDATE_JOB_REQUEST":
            return {
                updateloading: false,
            };
        case "UPDATE_JOB_SUCCESS":
            return {
                updateloading: false,
                updateerror: action.payload,
            };
        case "UPDATE_JOB_FAIL":
            return {
                updateloading: false,
                updateerror: action.payload,
            };
        default:
            return state;
    }
};


// export const careerpagereducer = (state = {updatecareerloading:true,updatecareererror:null, careerpagedata: null, publishedcareerdata: null, publishedcareerloading: true, deleteloading: true, deleteerror: null }, action) => {
//     switch (action.type) {
//         case "ALL_CAREERPAGE_REQUEST":
//             return {
//                 ...state
//                 , loading: true,
//                 careerpagedata: [],
//             };
//         case "ALL_CAREERPAGE_SUCCESS":
//             return {
//                 ...state,
//                 loading: false,
//                 careerpagedata: action.payload.data,
//             };

//         case "ALL_CAREERPAGE_FAIL":
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };
//         case "DELETE_CAREERPAGE_REQUEST":
//             return {
//                 ...state,
//                 deleteloading: true,

//             };
//         case "DELETE_CAREERPAGE_SUCCESS":
//             return {
//                 ...state,
//                 deleteloading: false,
//             };
//         case "DELETE_CAREERPAGE_FAIL":
//             return {
//                 ...state,
//                 deleteloading: false,
//                 deleteerror: action.payload,
//             };
//             case "UPDATE_CAREERPAGE_REQUEST":
//                 return {
//                     updatecareerloading: false,
//                 };
//             case "UPDATE_CAREERPAGE_SUCCESS":
//                 return {
//                     updatecareerloading: false,
//                 };
//             case "UPDATE_CAREERPAGE_FAIL":
//                 return {
//                     updatecareerloading: false,
//                     updatecareererror: action.payload,
//                 };
//         case "ALL_PUBLISHCAREERPAGE_REQUEST":
//             return {
//                 ...state,
//                 loading: true,

//             };
//         case "ALL_PUBLISHCAREERPAGE_SUCCESS":
//             return {
//                 ...state,
//                 publishedcareerloading: false,

//             };

//         case "ALL_PUBLISHCAREERPAGE_FAIL":
//             return {
//                 ...state,
//                 publishedcareerloading: false,
//                 error: action.payload,
//             };
//         case "ALL_GETPUBLISHCAREERPAGE_REQUEST":
//             return {
//                 ...state,
//                 publishedcareerloading: true,
//                 publishedcareerdata: {}
//             };
//         case "ALL_GETPUBLISHCAREERPAGE_SUCCESS":
//             return {
//                 ...state,
//                 publishedcareerloading: false,
//                 publishedcareerdata: action.payload
//             };

//         case "ALL_GETPUBLISHCAREERPAGE_FAIL":
//             return {
//                 ...state,
//                 publishedcareerloading: false,
//                 error: action.payload,
//             };

//         default:
//             return state;
//     }
// }
export const careerpagereducer = (state = {
    loading: true,
    error: null,
    careerpagedata: null,
    publishedcareerdata: null,
    updatecareerloading: true,
    deleteloading: false
}, action) => {
    switch (action.type) {
        case "ALL_CAREERPAGE_REQUEST":
        case "ALL_PUBLISHCAREERPAGE_REQUEST":
        case "ALL_GETPUBLISHCAREERPAGE_REQUEST":
        case "DELETE_CAREERPAGE_REQUEST":
        case "UPDATE_CAREERPAGE_REQUEST":
            return { ...state, loading: true, error: null };

        case "ALL_CAREERPAGE_SUCCESS":
            return { ...state, loading: false, careerpagedata: action.payload.data };

        case "ALL_PUBLISHCAREERPAGE_SUCCESS":
        case "ALL_GETPUBLISHCAREERPAGE_SUCCESS":
            return { ...state, loading: false, publishedcareerdata: action.payload };

        case "DELETE_CAREERPAGE_SUCCESS":
            return { ...state, loading: false, deleteloading: false };

        case "UPDATE_CAREERPAGE_SUCCESS":
            return { ...state, loading: false, updatecareerloading: false };

        case "ALL_CAREERPAGE_FAIL":
        case "ALL_PUBLISHCAREERPAGE_FAIL":
        case "ALL_GETPUBLISHCAREERPAGE_FAIL":
        case "DELETE_CAREERPAGE_FAIL":
        case "UPDATE_CAREERPAGE_FAIL":
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
