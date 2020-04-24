const INITIAL_STATE = {
    usuarioEmail: '',
    usuarioLogado: 0,
    token: '',
};

function usuarioReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'LOG_IN':
            return {...state, usuarioLogado: 1, token: action.token, usuarioEmail: action.usuarioEmail}
        case 'LOG_OUT':
            localStorage.removeItem('token')
            return {...state, usuarioLogado: 0, usuarioEmail: null}
        default:
            return state;
    }
}

export default usuarioReducer;