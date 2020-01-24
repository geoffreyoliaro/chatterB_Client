import{
    SET_USER, 
    SET_AUTHENTICATED, 
    SET_UNAUTHENTICATED,
    LOADING_USER,
    LIKE_SHOUT,
    UNLIKE_SHOUT


} from '../types';

const initialState ={
    authenticated:false,
    loading:false,
    credentials:{},
    likes:[],
    notifications:[]

};

export default function(state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return{
                ...state,
                authenticated:true,
                
            };
            case SET_UNAUTHENTICATED:
                return initialState;
            case SET_USER:
                return{
                    authenticated:true,
                    loading:false,
                    ...action.payload
                };
            case LOADING_USER:
                return{
                    ...state,
                    loading:true
                }
            case LIKE_SHOUT:
                return{
                    ...state,
                    likes:[
                        ...state.likes,
                        {
                            userHandle: state.credentials.handle,
                            shoutId: action.payload.shoutId
                        }

                    ]
                }
            case UNLIKE_SHOUT:
                return{
                    ...state,
                    likes:state.likes.filter(
                        (like)=>like.shoutId !== action.payload.shoutId)
                }            
                default:
                    return state;    
    }
}