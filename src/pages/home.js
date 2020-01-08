import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import Shout from '../components/Shout';

class home extends Component {
    state ={
        shouts:null
    }
    componentDidMount(){
        axios.get('/shouts')
         .then(res=>{
             console.log(res.data)
             this.setState({
                 shouts: res.data
             })
         })
         .catch(err=>console.log(err.code));

    }
    render() {
        let recentShoutsMarkup = this.state.shouts ?(
            this.state.shouts.map(shout => <Shout shout={shout} />)
            
            
        ): 
        <p>Loading ...</p>
        
        return (
            
            <Grid container spacing ={2}>
                <Grid item sm={8} xs={12}>
                    <p>Content...</p>
                    {recentShoutsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>
            </Grid>
            
        )
    }
}

export default home
