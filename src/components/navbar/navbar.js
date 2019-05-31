import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
// import { LinkContainer } from "react-router-bootstrap";
import Navbar from 'react-bootstrap/Navbar'
import './navbar.css'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const StyledDiv = styled.div `
    display: flex;
    flex-align: row;
    align-content: space-between;
    text-decoration: none;
    height: 100px;
    background-color: #55ffff;
    margin: 0 auto;

    .nav-link {
        display: flex;
        padding: 0.5rem 1rem;
        align-items: center;
        align-content: center;

    a {
        color: #000;
        text-decoration: none;
        font-size: 36px;
    }

    a:hover {
        color: #fff;


    }
`

class NavBar extends Component{
    
    render(){
        const {handleShow, isLogged, userID} = this.props 
        return (
        <StyledDiv>
            <StyledDiv>
                <Nav>
                    <Nav.Link>
                        <Link to='/'>
                        <Nav.Item>
                            Home
                        </Nav.Item>
                        </Link>
                    </Nav.Link>

                    <Nav.Link>
                    <Link to='/explore'>
                        <Nav.Item>
                            Explore
                        </Nav.Item>
                    </Link>
                    </Nav.Link>
                </Nav>
                <Nav >
            {isLogged
                ? (
                    <React.Fragment >
                        <Nav.Link>
                            <Link>
                                <Nav.Item className="justify-content-end" onClick={()=>{this.props.history.push(`/profile/${userID}`)}}  >
                                    Profile
                                </Nav.Item>
                            </Link>

                        </Nav.Link>
                        <Nav.Link>
                            <Link>
                                <Nav.Item onClick={()=>{this.props.doLogout()}} >
                                        Logout
                                </Nav.Item>
                            </Link>
                        </Nav.Link>
                    </React.Fragment>
                )
                : (
                    <React.Fragment>
                        <Nav.Link>
                            <Link>
                                <Nav.Item onClick={()=>{handleShow(2)}} >
                                    Register
                                </Nav.Item>
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link>
                                <Nav.Item onClick={()=>{handleShow(1)}}>
                                    Login
                                </Nav.Item>
                            </Link>
                        </Nav.Link>
                    </React.Fragment>
                )
                }
            </Nav>
        </StyledDiv>
        </StyledDiv>
    )}
    
}
export default withRouter(NavBar)