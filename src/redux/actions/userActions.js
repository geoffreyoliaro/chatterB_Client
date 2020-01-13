import{
    SET_USER, 
    SET_ERRORS,
    CLEAR_ERRORS, 
    LOADING_UI
} from '../types';
import axios from 'axios';

export const loginUser =(userData, history)=>(dispatch)=>{
    dispatch({type:LOADING_UI});
    axios
    .post('/login',userData)
    .then(res=>{
            const FBIdtoken =`Bearer ${res.data.token}`;
            localStorage.setItem('FBIdtoken', FBIdtoken);
            axios.defaults.headers.common['Authorization'] =FBIdtoken;
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push('/');  
        })
        .catch((err)=>{
           dispatch({
               type:SET_ERRORS,
               payload:err.response.data
           })
        });

}
export const getUserData = () =>(dispatch)=>{
    axios.get('/user')
        .then(res =>{
            dispatch({
                type: SET_USER,
                payload:res.data
            })
        })
        .catch(err=> console.log(err));

}