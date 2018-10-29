const initialState = {
    currentUser: null,
    isAuthenticated: false
};

export default function app(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                currentUser: action.currentUser,
                isAuthenticated: action.isAuthenticated
            });
        default:
            return state;
    }
}