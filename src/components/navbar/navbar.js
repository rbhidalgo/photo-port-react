import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
// import { LinkContainer } from "react-router-bootstrap";
import Navbar from 'react-bootstrap/Navbar'
import './navbar.css'
import 'bootstrap/dist/css/bootstrap.css'
import { withRouter } from 'react-router-dom'


class NavBar extends Component{
    
    render(){
        const {handleShow, isLogged, userID} = this.props 
        return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" className="navBar">
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
                    <div>
                        <Nav.Link>
                            <Link>
                                <Nav.Item onClick={()=>{this.props.history.push(`/profile/${userID}`)}}  >
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
                    </div>
                )
                : (
                    <div>
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
                    </div>
                )
                }
            </Nav>
        </Navbar>
        </div>
    )}
    
}
export default withRouter(NavBar)