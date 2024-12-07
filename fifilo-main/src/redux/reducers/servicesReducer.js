 
export const servicesReducer = (
    state = {
        loading: true,
        updateServiceLoading: true,
        deleteLoading: true,
        publishLoading: true,
        getServiceLoading: true,
        publishedServiceLoading: true,
        allServicesData: null,
        publishedServiceContent: null,
        publishedServicePage: null,
        error: null,
        updateServiceError: null,
        deleteError: null,
        publishError: null,
    },
    action
) => {
    switch (action.type) {
        // Get Services
        case "GET_SERVICE_REQUEST":
            return { ...state, getServiceLoading: true, error: null };
        case "GET_SERVICE_SUCCESS":
            return { ...state, getServiceLoading: false, allServicesData: action.payload };
        case "GET_SERVICE_FAIL":
            return { ...state, getServiceLoading: false, error: action.payload };

        // Create Service
        case "CREATE_SERVICEPAGE_REQUEST":
            return { ...state, loading: true, error: null };
        case "CREATE_SERVICEPAGE_SUCCESS":
            return { ...state, loading: false, allServicesData: [action.payload, ...state.allServicesData] };
        case "CREATE_SERVICEPAGE_FAIL":
            return { ...state, loading: false, error: action.payload };

        // Delete Service
        case "DELETE_SERVICEPAGE_REQUEST":
            return { ...state, deleteLoading: true, deleteError: null };
        case "DELETE_SERVICEPAGE_SUCCESS":
            return {
                ...state,
                deleteLoading: false,
                allServicesData: state.allServicesData?.filter(service => service._id !== action.payload),
            };
        case "DELETE_SERVICEPAGE_FAIL":
            return { ...state, deleteLoading: false, deleteError: action.payload };

        // Update Service
        case "UPDATE_SERVICEPAGE_REQUEST":
            return { ...state, updateServiceLoading: true, updateServiceError: null };
        case "UPDATE_SERVICEPAGE_SUCCESS":
            return { ...state, updateServiceLoading: false };
        case "UPDATE_SERVICEPAGE_FAIL":
            return {
                ...state,
                updateServiceLoading: false,
                updateServiceError: action.payload?.response?.data?.message || action.payload.message,
            };

        // Publish Service
        case "PUBLISH_SERVICEPAGE_REQUEST":
            return { ...state, publishLoading: true, publishError: null };
        case "PUBLISH_SERVICEPAGE_SUCCESS":
            return { ...state, publishLoading: false, publishedServiceContent: action.payload };
        case "PUBLISH_SERVICEPAGE_FAIL":
            return { ...state, publishLoading: false, publishError: action.payload };

        // Get Published Service
        case "GET_SERVICEPUBLISH_REQUEST":
            return { ...state, publishedServiceLoading: true, publishError: null };
        case "GET_SERVICEPUBLISH_SUCCESS":
            return { ...state, publishedServiceLoading: false, publishedServicePage: action.payload };
        case "GET_SERVICEPUBLISH_FAIL":
            return { ...state, publishedServiceLoading: false, publishError: action.payload };

        default:
            return state;
    }
};
