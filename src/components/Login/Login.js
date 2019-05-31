import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import {Redirect,Route ,withRouter} from "react-router"





class Login extends Component {

    state = {
        username: '',
        password: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        
        const loggedUser = {
            username: this.state.username,
            password: this.state.password
        }

        try {
            const loginResponse = await fetch('http://localhost:8000/users/login', {
                method: 'POST',
                // credentials: 'include',
                body: JSON.stringify(loggedUser),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:8000'
                }
            })

            const parsedResponse = await loginResponse.json();
            console.log(parsedResponse.user.id)
            if(parsedResponse.message = "success"){
                this.props.logged(parsedResponse.user.id);
                // this.props.history.push(`/profile/${parsedResponse.id}`);

                this.props.onHide()
                return this.props.history.push(`/`)
            } else {
                this.setState({
                    authMessage: parsedResponse
                })
            }


        } catch(err) {
            console.log(err);
            return err
        }
    }

    render() {
        return(
            <div className="login">
                <h3>Login</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username
                        <input type="text" name="username" placeholder="username" onChange={this.handleChange} value={this.state.username}/>
                    </label>
                    <br />
                    <label>
                        Password
                        <input type="password" name="password" placeholder="password" onChange={this.handleChange} value={this.state.password}/>
                    </label>
                    <br />
                    <Button type="submit" onSubmit={this.handleSubmit}>Login</Button>

                </form> 
            </div>
        )   
    }
}


export default withRouter(Login);




