import {SET_SHOUTS, LIKE_SHOUT, UNLIKE_SHOUT, LOADING_DATA} from '../types';


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
            case LIKE_SHOUT:
            case UNLIKE_SHOUT:    
                let index = state.shouts.findIndex((newShout) => newShout.shoutId === action.payload.shoutId);
                state.shouts[index] = action.payload;
                return{
                    ...state
                }
            default: 
                return state;
     }
 }