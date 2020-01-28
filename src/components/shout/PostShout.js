import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';

//MUI stuff
import { Dialog, DialogTitle, DialogContent, TextField, Button, withStyles } from '@material-ui/core';
import MyButton from '../../util/MyButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

//redux
import {connect} from 'react-redux';
import {postShout, clearErrors} from '../../redux/actions/dataActions';

const styles=(theme)=>({
    ...theme.spreadThis,
    submitButton:{
        position: 'relative',
        float:'right',
        marginTop: 10
    },
    progressSpinner:{
        position:'absolute'
    },
    closeButton:{
        position:'absolute',
        left:'91%',
        top: '6%'
    }

})

class PostShout extends Component{
    state ={
        open: false,
        body:'',
        errors:{}
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors:nextProps.UI.errors
            });
        };
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({body:'', open:false, errors:{}});
            
        }
    }

    handleOpen =() =>{
        this.setState({open:true});
    }
    handleClose =() =>{
        this.props.clearErrors();
        this.setState({open:false, errors:{}});
    }
    handleChange =(event)=>{
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit =(event)=>{
        event.preventDefault();
        this.props.postShout({body:this.state.body})
    }
    render(){
       const {errors} = this.state;
       const {classes, UI:{loading}} =this.props;
       return(
           <Fragment>
               <MyButton onClick ={this.handleOpen} tip="Post a Shout!">
                   <AddIcon />
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

                <DialogTitle>
                Post a new Shout
                </DialogTitle>
                <DialogContent>
                <form onSubmit={this.handleSubmit}>
                <TextField
                    name="body"
                    type="text"
                    label="SHOUT!!"
                    multiline
                    rows="3"
                    placeholder="Shout at your fellow friends"
                    error={errors.body ? true : false}
                    helperText={errors.body}
                    className={classes.textField}
                    onChange={this.handleChange}
                    fullWidth
                />
            <Button 
                type="submit" 
                variant="contained" 
                color ="primary"
                className={classes.submitButton} 
                disabled={loading}>
                Submit
                {loading && (
                            <CircularProgress 
                                    size={30}
                            className={classes.progressSpinner}
                                    />
                                    )}
                                </Button>
                                    </form>
                        </DialogContent>

               </Dialog>
           </Fragment>
       );
    }
}

PostShout.propTypes = {
    postShout:PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors:PropTypes.func.isRequired
};

const mapStateToProps =(state)=>({
    UI:state.UI
})



export default connect(
    mapStateToProps,
    {postShout, clearErrors}
    )(withStyles(styles)(PostShout));



