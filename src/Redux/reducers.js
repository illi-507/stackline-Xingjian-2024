const initialState ={
    data:null,
    error: null
}

function dataReducer(state=initialState, action){
   switch(action.type){
    case "FETCH_DATA_SUCCESS":
        return {...state, data:action.payload, error:null}
    case "FETCH_DATA_FAILURE":
        return {...state, data:null, error:action.payload}
    case "UPDATE_DATA":
        return {...state, data:action.payload, error: null }
    default:
            return state;
   }
}

export default dataReducer;