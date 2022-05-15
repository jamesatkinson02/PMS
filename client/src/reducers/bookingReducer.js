const bookingReducer = (state, action) => {
    switch(action.type)
    {
        case 'DELETE BOOKING':
            return {
                ...state,
                deleteBookingID: action.bookingID
            }
        case 'EDIT BOOKING':
            return {
                ...state,
                editBookingID: action.bookingID
            }
    }
}

export default bookingReducer;