
export const pageReducer = (state = { pageData: null, pageloading: true }, action) => {
    switch (action.type) {
        case "PAGEDATA":
            return {
                pageloading: true,
                pageData: action.payload
            };
        default:
            return state;
    }
};
