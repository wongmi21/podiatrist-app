const initialState = {
    auth: false
};

export default function app(state = initialState, action) {
    switch (action.type) {
        case 'TOGGLE_AUTH':
            return Object.assign({}, state, {
                auth: action.auth
            });
        default:
            return state;
    }
}