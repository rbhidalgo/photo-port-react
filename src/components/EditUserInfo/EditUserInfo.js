import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import {Redirect, Route, withRouter} from "react-router"



class EditUserInfo extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        userObj:{},
        userID: '',
    }
    doHandleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }

    doHandleSubmit = async(e) => {

        e.preventDefault()
        console.log("updating it")
        const updateResponse = await fetch (`${process.env.REACT_APP_BACKEND_URL}/${this.state.userID}`,{
            method:"PUT",
            body: JSON.stringify(this.state),
            headers:{
                "Content-Type":'application/json'
            }
        });


   
        this.props.onHide();
        this.props.history.push(`/profile/${this.state.userID}`);


    }


    getUser = async()=>{
        console.log(this.props.userID,'this is props userid')
        await this.setState({
            userID:this.props.userID
        })
        
        console.log(this.state)
        const userResponse = await fetch (`${process.env.REACT_APP_BACKEND_URL}/${this.state.userID}`,{
            method:"GET",
            headers:{
                "Content-Type":'application/json'
            }
        });
        const parsedResponse = await userResponse.json();
        console.log(parsedResponse)
        this.setState({
            userObj: parsedResponse
        })
       
    }

    componentDidMount(){
        this.getUser();

    }
    render() {
        console.log(this.state.userObj)
        return(
            <div className="edit">
                <form onSubmit={this.doHandleSubmit}>
                    <h2>Edit Your Profile</h2>
                    <label>
                        <input type="text" name="username" defaultValue={this.state.userObj.username} onChange={this.doHandleInput} placeholder="username" />
                    </label>
                    <br/>
                    <label>
                        <input type="text" name="email" defaultValue={this.state.userObj.email} placeholder={this.state.userObj.email} onChange={this.doHandleInput} placeholder="email" />    
                    </label>
                    <br/>
                    <label>
                        <input type="password" name="password" defaultValue={this.state.userObj.password} placeholder={this.state.userObj.password} onChange={this.doHandleInput} placeholder="password" />
                    </label>
                    <br/>
                    <Button type="submit" onSubmit={this.doHandleSubmit}>Update Profile</Button>
                </form>
            </div>
        )
    }
}


export default withRouter(EditUserInfo);