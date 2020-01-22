import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';

import Shout from '../components/Shout';
import Profile from '../components/Profile';

class home extends Component {
    state ={
        shouts:null
    }
    componentDidMount(){
        axios.get('/shouts')
         .then(res=>{
             this.setState({
                 shouts: res.data
             })
         })
         .catch(err=>console.log(err.code));

    }
    render() {
        let recentShoutsMarkup = this.state.shouts ?(
            this.state.shouts.map(shout => <Shout key={shout.shoutId} shout={shout} />)
            
        ): 
        <LinearProgress variant="query" />
        
        
        return (
            <Grid container spacing ={2}>
                <Grid item sm={8} xs={12}>
                    {recentShoutsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
            
        )
    }
}

export default home
