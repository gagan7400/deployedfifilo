
export const faqPageReducer = (state = { updatefaqloading:true, updatefaqerror: null, createloading: true, createerror: null, faqdata: null, publishedfaqdata: null, publishedfaqloading: true, deleteloading: true, deleteerror: null }, action) => {
    switch (action.type) {
        case "CREATE_FAQPAGE_REQUEST":
            return {
                ...state,
                createloading: true,
            };
        case "CREATE_FAQPAGE_SUCCESS":
            return {
                ...state,
                createloading: false,
            };
        case "CREATE_FAQPAGE_FAIL":
            return {
                ...state,
                createloading: false,
                createerror: action.payload,
            };
        case "ALL_FAQPAGE_REQUEST":
            return {
                ...state
                , loading: true,
                faqdata: null,
            };
        case "ALL_FAQPAGE_SUCCESS":
            return {
                ...state,
                loading: false,
                faqdata: action.payload,
            };

        case "ALL_FAQPAGE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "DELETE_FAQPAGE_REQUEST":
            return {
                ...state,
                deleteloading: true,

            };
        case "DELETE_FAQPAGE_SUCCESS":
            return {
                ...state,
                deleteloading: false,
            };
        case "DELETE_FAQPAGE_FAIL":
            return {
                ...state,
                deleteloading: false,
                deleteerror: action.payload,
            };
        case "UPDATE_FAQPAGE_REQUEST":
            return {
                updatefaqloading: false,
            };
        case "UPDATE_FAQPAGE_SUCCESS":
            return {
                updatefaqloading: false,
                updatefaqerror: action.payload,
            };
        case "UPDATE_FAQPAGE_FAIL":
            return {
                updatefaqloading: false,
                updatefaqerror: action.payload,
            };
        case "ALL_PUBLISHFAQPAGE_REQUEST":
            return {
                ...state,
                loading: true,

            };
        case "ALL_PUBLISHFAQPAGE_SUCCESS":
            return {
                ...state,
                publishedfaqloading: false,

            };

        case "ALL_PUBLISHFAQPAGE_FAIL":
            return {
                ...state,
                publishedfaqloading: false,
                error: action.payload,
            };
        case "ALL_GETPUBLISHFAQPAGE_REQUEST":
            return {
                ...state,
                publishedfaqloading: true,
                publishedfaqdata: null
            };
        case "ALL_GETPUBLISHFAQPAGE_SUCCESS":
            return {
                ...state,
                publishedfaqloading: false,
                publishedfaqdata: action.payload
            };

        case "ALL_GETPUBLISHFAQPAGE_FAIL":
            return {
                ...state,
                publishedfaqloading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}
