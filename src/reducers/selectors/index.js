export const identity = (state) => {
    try {
        return state.identity;
    } catch (e) {
        return {};
    }
};