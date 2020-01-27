import {
    SET_SHOUTS,
    LOADING_DATA, 
    LIKE_SHOUT, 
    UNLIKE_SHOUT,
    DELETE_SHOUT,
    LOADING_UI,
    SET_ERRORS,
    CLEAR_ERRORS,
    POST_SHOUT
} from '../types';
import axios from 'axios';

//Get all shouts
export const getShouts =()=> (dispatch)=>{
    dispatch({type:LOADING_DATA});
    axios
    .get('/shouts')
    .then((res)=>{
            dispatch({
                type:SET_SHOUTS,
                payload:res.data
            });
        })
        .catch((err)=>{
            dispatch({
            type: SET_SHOUTS,
            payload: []
            });
        });
};

//Post a shout

export const postShout =(new_Shout) =>(dispatch)=>{
    dispatch({type: LOADING_UI});
    axios.post('/newShout', new_Shout)
        .then((res)=>{
            dispatch({
                type:POST_SHOUT,
                payload:res.data
            });
            dispatch({type: CLEAR_ERRORS});
        })
        .catch((err)=>{
            dispatch({
                type: SET_ERRORS,
                payload:err.response.data
            })
            console.error(err)
        })

}

//Like a shout
export const likeShout = (shoutId)=>(dispatch)=>{
    axios.get(`/newShout/${shoutId}/likeShout`)
        .then((res)=>{
            dispatch({
              type:LIKE_SHOUT,
              payload:res.data  
            })
        })
        .catch((err)=> console.error(err));
}

//Unlike a shout
export const unLikeShout = (shoutId)=>(dispatch)=>{
    axios.get(`/newShout/${shoutId}/unLikeShout`)
        .then((res)=>{
            dispatch({
              type:UNLIKE_SHOUT,
              payload:res.data  
            })
        })
        .catch((err)=> console.error(err));
}

export const deleteShout=(shoutId) =>(dispatch)=>{
    axios
        .delete(`/newShout/${shoutId}`)
        .then(()=>{
            dispatch({type: DELETE_SHOUT, payload: shoutId})
        })
        .catch((err)=> console.log(err));
}


export const clearErrors = ()=>(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}