import React, { Component } from 'react';
import AddPhoto from '../AddPhoto/AddPhoto';
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {Container, Card, CardDeck, Row} from 'react-bootstrap'


class Profile extends Component {
    state = {
        userID: null,
        userObj:{},
        userPhotos:[]
    }

    
    getUser = async()=>{
        
        await this.setState({
            userID:this.props.match.params.id
        })
        
        const userResponse = await fetch (`http://localhost:8000/users/${this.props.match.params.id}`,{
            method:"GET",
            headers:{
                "Content-Type":'application/json'
            }
        });
        const parsedResponse = await userResponse.json();
        console.log(parsedResponse, ' this is parsed response')
        this.setState({
            userObj: parsedResponse
        })
       
    }
    getPhotos = async()=>{
        const photoRespnse = await fetch('http://localhost:8000/photos/',{
            method:"GET",
            headers:{
                "Content-Type": 'application'
            }
        });
        const parsedResponse = await photoRespnse.json();
        console.log(parsedResponse,' this should be the photos')
        this.setState({
            userPhotos: parsedResponse
        })
    }
    checkPhotos =(arr,id)=>{
        let newArr = [];
        for(let i = 0;i<arr.length;i++){
            console.log(arr[i].created_by)
            if(arr[i].created_by ==id){
                 newArr.push(arr[i])
            }
        }
        return newArr;
    }

    componentDidMount(){
        this.getUser();
        this.getPhotos();
    }

    render(){
        console.log(this.state.userPhotos)
        const photos = this.checkPhotos(this.state.userPhotos,this.state.userID)
        console.log(photos)
        const {handleShow} = this.props 
        return(
            <div>
                <h1> Hey, {this.state.userObj.username}</h1>
                {this.props.logged
                ?   
                <div>
                    <Button onClick={()=>{handleShow(3)}}>AddPhoto</Button>
                    <Button onClick={()=>{handleShow(4)}}>Edit Profile</Button>
   
                    </div> 
                :<p></p>}
            
            
            
            <h1>User's photos</h1>
            <div>
            <Container>
            <CardDeck>
            {photos.map((photo,index)=>{
                return(
                
                <Card>
                    <Card.Img variant="top" src="https://picsum.photos/id/851/300/300" />
                    <Card.Body>
                    <Card.Title>{photo.title}</Card.Title>
                    <Card.Text>
                    Something
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick='this.props.delete'>Delete</Button>
                    </Card.Footer>

                </Card>
                )
                })
            }
            </CardDeck>
            </Container>
            </div>
           
              

            
            </div>
        )
    }
}


export default withRouter(Profile);