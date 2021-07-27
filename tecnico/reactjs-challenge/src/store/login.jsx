const login = (state = { usuario: null, typed: true, valido: false }, action) => {
    switch (action.type) {
        case "TYPED":
            return {
                usuario: action.usuario,
                typed: action.typed,
                valido: false
            };
        case "VALIDATE":
            state.valido = true;
            return state;
        case "LOGOUT":
            state.valido = false;
            state.usuario = null;
            state.typed = false
            return state;
        default:
            return state;
    }
}

export { login }