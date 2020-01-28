import React, { Component } from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import './App.css';

//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userActions';

//Mui stuff
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
//components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';
//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import axios from 'axios';
// import { render } from '@testing-library/react';

const cust_theme = createMuiTheme(themeFile);


const token = localStorage.FBIdtoken;
if(token){
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href ='/login';
  }else{
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData())
  }
}

class App extends Component{
render(){
   return(
      <MuiThemeProvider theme={cust_theme}>
      <Provider store ={store}>
        <div className="App">
         <Router>
         <Navbar/>
         <div className="container">
          <Switch>
            <Route exact path = "/" component ={home}/>
            <AuthRoute exact path = "/login" component ={login} />
            <AuthRoute exact path = "/signup" component ={signup} />
          </Switch>  
        </div>
        </Router>
      </div>
      </Provider>
</MuiThemeProvider>
    )
  }

}

export default App;
