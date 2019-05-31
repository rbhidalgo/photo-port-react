import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import {withRouter} from "react-router";

class Register extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        verify_password: ''   
    }

    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async(e) => {
        e.preventDefault()

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            verify_password: this.state.verify_password
          };
        
        try {
            const loginResponse = await fetch('http://localhost:8000/users/', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:8000'
                }
            })

            const parsedResponse = await loginResponse.json();
            console.log(parsedResponse)
            if(parsedResponse.success === 'sucess'){
                this.props.loginUser(parsedResponse);
                this.props.history.push(`/profile`);
                this.props.onHide()

            }


        } catch(err) {
            console.log(err);
            return err
        }
    
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <input type='text' name='username' placeholder='username' onChange={this.handleChange} value={this.state.username}/><br/>
                </label>
                <label>
                    Email:
                    <input type='email' name='email' placeholder='email' onChange={this.handleChange} value={this.state.email}/><br/>
                </label>
                <label>
                    Password:
                    <input type='text' name='password' placeholder='password' onChange={this.handleChange} value={this.state.password}/><br/>
                </label>
                <label>
                    Verify password:
                    <input type='text' name='verify_password' placeholder='confirm password' onChange={this.handleChange} value={this.state.verify_password}/><br/>
                </label>
                <Button type='submit'>Register</Button>
            </form>
        )
    }
}

export default withRouter(Register);