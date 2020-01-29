import React, { Component } from 'react'
import propTypes from 'prop-types';
import axios from 'axios';
import Shout from '../components/shout/Shout';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid'


import {connect} from 'react-redux';
import {getUserData} from '../redux/actions/dataActions';


class user extends Component {
    state={
        profile:null,
        shoutIdParam:null
    }

    componentDidMount(){
        const handle = this.props.match.params.handle;
        const shoutId = this.props.match.params.shoutId;

        if(shoutId) this.setState({shoutIdParam: shoutId});


        this.props.getUserData(handle);
        axios(`/user/${handle}`)
            .then((res)=>{
                this.setState({
                   profile:res.data.user 
                })
            })
            .catch((err)=>console.log(err));

    }
    render() {
        const {shouts, loading} = this.props.data;
        const{shoutIdParam} =this.state;
        const shoutsMarkup = loading ? (
            <p>loading data ...</p>
        ) : shouts === null ? (
            <p>No shouts from user</p>
        ) : !shoutIdParam ?(
            shouts.map((newShout)=> <Shout key={newShout.shoutId} shout={newShout}/>)
        ) : (
            shouts.map(newShout =>{
                if(newShout.shoutId !== shoutIdParam)
                    return <Shout key={newShout.shoutId} shout={newShout}/>
                else return <Shout key={newShout.shoutId} shout={newShout} openDialog/>    

            })            
        )

        return (
            <Grid container spacing ={2}>
            <Grid item sm={8} xs={12}>
                {shoutsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                {this.state.profile === null ? (
                    <p>loading profile...</p>
                ) : (
                    <StaticProfile profile={this.state.profile}/>
                )}
            
            </Grid>
        </Grid>
           
        )
    }
}

user.propTypes ={
    getUserData: propTypes.func.isRequired,
    data:propTypes.object.isRequired
}

const mapStateToProps =(state) =>({
    data: state.data
})

export default connect(mapStateToProps, {getUserData})(user)
