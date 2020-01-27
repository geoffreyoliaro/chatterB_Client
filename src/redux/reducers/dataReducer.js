import {
    SET_SHOUTS, 
    SET_SHOUT,
    LIKE_SHOUT, 
    UNLIKE_SHOUT, 
    LOADING_DATA, 
    DELETE_SHOUT,
    POST_SHOUT
} from '../types';


 const initialState = {
     shouts: [],
     newShout:{},
     loading:false
 };

 export default function(state = initialState, action){
     switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading:true
            }
            case SET_SHOUTS:
                return{
                    ...state,
                    shouts: action.payload,
                    loading:false
                }
            case SET_SHOUT:
                return{
                    ...state,
                    shout: action.payload

                }    
            case LIKE_SHOUT:
            case UNLIKE_SHOUT:    
                let index = state.shouts.findIndex((newShout) => newShout.shoutId === action.payload.shoutId);
                state.shouts[index] = action.payload;
                return{
                    ...state
                };
            case DELETE_SHOUT:
                index = state.shouts.findIndex(
                    newShout =>newShout.shoutId === action.payload
                    );
                state.shouts.splice(index, 1);
                return{
                    ...state
                }
            case POST_SHOUT:
                return{
                    ...state,
                    shouts:[
                        action.payload,
                        ...state.shouts

                    ]

                }


            default: 
                return state;
     }
 }