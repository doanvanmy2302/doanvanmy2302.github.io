import * as ActionTypes from "./ActionTypes";

export const Staffs = (state = {
    isLoading: true,
    errMess: null,
    staffs: [],
    }, action) => {
        switch(action.type) {
            case ActionTypes.ADD_STAFF:
                return {...state, isLoading: false, errMess: null, staffs: state.staffs.concat(action.payload)}
                
            case ActionTypes.STAFFS_LOADING:
                return {...state, isLoading: true, errMess: null, staffs: []};
                
            case ActionTypes.ADD_STAFFS:
                return {...state, isLoading: false, errMess: null, staffs: action.payload};
                
            case ActionTypes.STAFFS_FAILED:
                return {...state, isLoading: false, errMess: action.payload, staffs: []};
                
            case ActionTypes.DELETE_STAFF:
                var staff = action.payload;
                var _id = staff.id;
                return {...state, staffs: state.staffs.splice(_id, 1)};
                        
            default:
                return state;
        }
}