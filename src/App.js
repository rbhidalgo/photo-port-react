import React, { Component } from 'react'
// import ReactDOM from 'react-dom'   
import { Route, Switch ,withRouter} from 'react-router-dom'
import './App.css';
import Login from './components/Login/Login'
import Explore from './components/Explore/Explore'
import Register from './components/Register/register'
import Navbar from './components/Navbar/navbar'
import Popup from './components/Modal/modal'
import Profile from './components/Profile/Profile'
import * as routes from './constants/routes'
import Home from './components/Home/Home'
import EditUserInfo from './components/EditUserInfo/EditUserInfo'
import Logout from './components/Login/Login'




class App extends Component{
  state = {
    show: false,
    modalID: 0,
    logged: false,
    userID: null
  }
  checkedLogged= (userID)=>{
    this.setState({
      logged:true,
      userID: userID
    })
  }

  deletePic = async(id) =>{
    await fetch(`http://localhost:8000/photos/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type": 'application'
    }
    })
  }

  doLogout = async () => {
    console.log('logout')
    await fetch('http://localhost:8000/users/',{ 
      method:"GET",
      headers:{
          "Content-Type": 'application'
    }
    })
    this.props.history.push('/')
    this.setState({
        logged: false
    })
  }

  handleClose = ()=> {
    this.setState({ show: false });
  }

  handleShow = (num)=> {
    this.setState({ show: true ,modalID: num});
  }
  render(){
    return (
      <React.Fragment>
        <Navbar handleShow = {this.handleShow} doLogout={this.doLogout} isLogged={this.state.logged} getUser={this.getUser} userID={this.state.userID}/>
          <Switch>
            <Route exact path={routes.HOME} render={() =><Home creator={this.state.userID}/> } />
            <Route exact path={routes.REGISTER} render={()  =><Register /> } />
            <Route exact path={routes.LOGIN} render={()  =><Login /> } />
            <Route exact path={routes.EXPLORE} render={()  =><Explore />} />
            <Route exact path={`${routes.PROFILE}/:id`} render={()  =><Profile delete={this.deletePic}userID={this.state.userID} handleShow = {this.handleShow} logged={this.state.logged}/>} />

            <Route exact path={routes.LOGOUT} render={()  =><Logout logStat={this.state.logged}/>} />
          </Switch>
        <Popup  handleClose= {this.handleClose} getUser={this.getUser} checkedLogged={this.checkedLogged} modalID = {this.state.modalID} show = {this.state.show} userID={this.state.userID} />
      </React.Fragment>
    )};
}


export default withRouter(App);