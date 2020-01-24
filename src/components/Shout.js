import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteShout from './DeleteShout';


//Mui stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import {connect} from 'react-redux';
import {likeShout, unLikeShout} from '../redux/actions/dataActions';


const styles= {
    card:{
        position:'relative',
        display:'flex',
        marginBottom:20,
    },
    image:{
        width:200
    },
    content:{
        padding:25, 
        objectFit:'cover'
    }

};
class Shout extends Component {
    likedShout =()=>{
        if(
            this.props.user.likes &&
             this.props.user.likes.find(
                 (like)=>like.shoutId === this.props.shout.shoutId
                     )
                 )
            return true;
        else return false;
             };
    likeShout = () =>{
        this.props.likeShout(this.props.shout.shoutId);
    };
    unLikeShout = () =>{
        this.props.unLikeShout(this.props.shout.shoutId);
    };         

render() {
        dayjs.extend(relativeTime)
        const {
            classes,
            shout:{
            body,
            createdAt, 
            userImage,
            userHandle, 
            likeCount, 
            commentCount
    }, 
    user:{ authenticated, 
        credentials:{ handle }
    }
    
}=this.props;

const likeButton = !authenticated ? (
            <MyButton tip="Like">
                <Link to="/login">
                    <FavoriteBorder color="primary"/>
                </Link>
            </MyButton>
        ) : this.likedShout() ? (
               <MyButton tip="remove like" onClick={this.unLikeShout}>
                   <FavoriteIcon color="primary"/>
               </MyButton>
           ) : (
            <MyButton tip="like" onClick={this.likeShout}>
                <FavoriteBorder color="primary"/>
            </MyButton>
        );

 const deleteButton = authenticated && userHandle === handle ? (
 <DeleteShout shoutId="shoutId"/>
 ):null; 
return (
    <Card className ={classes.card}>
        <CardMedia 
        image = {userImage}
        title ="Profile image" className ={classes.image}
        />
        <CardContent className={classes.content}>
        <Typography variant="h5" component={Link} to={`/users/${userHandle}`} >{userHandle}</Typography> 
        {deleteButton}
        <Typography variant="body1">{body}</Typography>
        <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
        {likeButton}
        <span>{likeCount} Likes </span>
        <MyButton tip="comments">
            <ChatIcon color="primary"/>
        </MyButton>
        <span>{commentCount} comments </span>  

        </CardContent>
    </Card>
        )
    }
}
Shout.propTypes = {
    likeShout: PropTypes.func.isRequired,
    unLikeShout: PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    shout:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired

}


const mapStateToProps = (state) =>({
    user:state.user
})

const mapActionsToProps ={
    likeShout,
    unLikeShout
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Shout));
