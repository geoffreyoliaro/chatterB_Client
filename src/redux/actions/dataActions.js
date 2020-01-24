import {
    SET_SHOUTS,
    LOADING_DATA, 
    LIKE_SHOUT, 
    UNLIKE_SHOUT,
    DELETE_SHOUT
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