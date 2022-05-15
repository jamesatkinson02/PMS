const formReducer = (state, action) => {
    switch(action.type)
    {
        case 'FORM INPUT':
            return {
                ...state,
                [action.field]: action.payload
            };
        case 'TOGGLE TEN DAY ERROR':
            return {
                ...state,
                tenDayError: !state.tenDayError
            }
        case 'SET MAP LOCATION':
            return{
                ...state,
                location: action.location
            }
        case 'TOGGLE NO MORE SPACES MODAL':
            return {
                ...state,
                noMoreSpaces: !state.noMoreSpaces
            }
        default:
            return state;
        
    }
}


export default formReducer;