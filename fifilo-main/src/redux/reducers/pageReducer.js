
export const pageReducer = (state = { pageData: null, pageloading: true }, action) => {
    switch (action.type) {
        case "PAGEDATA":
            return {
                pageloading: false,
                pageData: action.payload
            };
        default:
            return state;
    }
};
