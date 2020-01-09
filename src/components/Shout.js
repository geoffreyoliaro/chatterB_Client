import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'


//Mui stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';



const styles= {
    card:{
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

}
class Shout extends Component {
    render() {
        dayjs.extend(relativeTime)
        const {classes, shout:{body,
                         createdAt, 
                         userImage,
                          userHandle, 
                          likeCount, 
                          commentCount}} = this.props;

        return (
         <Card className ={classes.card}>
             <CardMedia 
             image = {userImage}
             title ="Profile image" className ={classes.image}
             />
             <CardContent className={classes.content}>
                <Typography variant="h5" component={Link} to={`/users/${userHandle}`} >{userHandle}</Typography> 
                <Typography variant="body1">{body}</Typography>
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
             </CardContent>
         </Card>
        )
    }
}

export default withStyles(styles)(Shout);
