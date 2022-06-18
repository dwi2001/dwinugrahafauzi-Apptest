let initialState = {
    data: []
}

export default contact = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DATA':
            return {
                ...state,
                getDatas: action.payload.data.result
            }
        default:
            return state
    }

}