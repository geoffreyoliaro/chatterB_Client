import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import Comments from './Comments';

//MUI stuff
import { Dialog, DialogContent, withStyles, CircularProgress } from '@material-ui/core';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';


import UnfoldMore from '@material-ui/icons/UnfoldMore';

import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';


import {connect} from 'react-redux';
import {getShout} from '../../redux/actions/dataActions';
import LikeButton from './LikeButton';

const styles = (theme) =>({
    ...theme.spreadThis,
    
    profileImage:{
        maxWidth:200,
        height:200,
        borderRadius:'50%',
        objectFit:'cover'
    },
    DialogContent:{
        padding:20
    },
    closeButton:{
        position:'absolute',
        left:'90%'
    },
    expandButton:{
        position:'absolute',
        left:'90%'
    },
    spinnerDiv:{
        textAlign:'center',
        marginTop: 50,
        marginBottom: 50
    }



})

class ShoutDialog extends Component{
    state={
        open:false
    }
    handleOpen = () =>{
        this.setState({open:true});
        this.props.getShout(this.props.shoutId)
    }
    handleClose = () =>{
        this.setState({open:false});
    }
    

 render() {
        
        const {
            classes, 
            newShout:{
                userImage,
                shoutId, 
                body, 
                createdAt, 
                likeCount, 
                commentCount, 
                userHandle, 
                comments
            }, 
            UI:{loading}
        } =this.props;
    
        
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
            <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={10}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${userHandle}`}>
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                    <Typography variant ="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton shoutId={shoutId}/>
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                    <ChatIcon color="primary"/>
                     </MyButton>
                    <span>{commentCount} comments </span>  
                </Grid>
                <hr className ={classes.visibleSeparator}/>
                <Comments comments ={comments}/>
            </Grid>
        );
    

        return(
            <Fragment>
                <MyButton 
                onClick={this.handleOpen} 
                tip="Expand Shout" 
                tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary"/>
                </MyButton> 
                <Dialog 
                open={this.state.open} 
                 onClose={this.handleClose}
                 fullWidth 
                 maxWidth="sm">

                <MyButton 
                tip="Close" 
                onClick={this.handleClose} 
                tipClassName={classes.closeButton}>
                <CloseIcon/>
                </MyButton>
                <DialogContent
                    className={classes.DialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
                
            </Fragment>
        );
    }
}

ShoutDialog.propTypes={
    getShout:PropTypes.func.isRequired,
    shoutId:PropTypes.string.isRequired,
    userHandle:PropTypes.string.isRequired,
    newShout: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    newShout:state.data.newShout,
    UI: state.UI
})

const mapActionsToProps ={
    getShout
};

export default connect(
    mapStateToProps, 
    mapActionsToProps
    )(withStyles(styles)(ShoutDialog));
