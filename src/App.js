import React, { Component } from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import './App.css';
//Mui stuff
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
//components
import Navbar from './components/Navbar';
//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
// import { render } from '@testing-library/react';

const cust_theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce9',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography:{
    useNextVariants:true
  }
});
class App extends Component{
render(){
   return(
      <MuiThemeProvider theme={cust_theme}>
        <div className="App">
         <Router>
         <Navbar/>
         <div className="container">
          <Switch>
            <Route exact path = "/" component ={home}/>
            <Route exact path = "/login" component ={login}/>
            <Route exact path = "/signup" component ={signup}/>
          </Switch>  
        </div>
        </Router>
      </div>
</MuiThemeProvider>
    )
  }

}

export default App;
