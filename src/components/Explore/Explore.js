import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Card, CardDeck, Row, Image} from 'react-bootstrap'
import styled from 'styled-components'
import { Link } from 'react-router-dom'



const CardDeckMargin = styled(CardDeck) `
    margin-top: 20px;
    margin-bottom: 20px;

    
`

class Explore extends Component {

  state = {
    photo: [],
    userId: []
  }


  getPhotos = async () => {
    try {
      const allPhotos = await fetch(`${process.env.REACT_APP_BACKEND_URL}photos/`, {
        method:"GET",
        headers: {
          "Content-Type": 'application/json'
        }
      });

      const parsedResponse = await allPhotos.json();
      console.log(parsedResponse, ' this is parsed response')
      this.setState({
        photo: parsedResponse
      })
      console.log(this.state.photo[0].url, '<-----photos url')
    } catch (err) {
      console.log(err)
      return err
    }
  }

  getUser = async()=>{
        
 try {
    const userResponse = await fetch (`${process.env.REACT_APP_BACKEND_URL}users/`,{
        method:"GET",
        headers:{
            "Content-Type":'application/json'
        }
    });
    const parsedResponse = await userResponse.json();
    console.log(parsedResponse, ' this is parsed response')
    this.setState({
        userId: parsedResponse
    })
    console.log(this.state.userId,'this is the state')
  } catch(err){
    console.log(err)
    return err
  }
}
  getUsername=(arr,id)=>{
    for(let i = 0;i<arr.length;i++){

      console.log(arr[i])
      console.log(id)
      if(arr[i].id==id){

        return arr[i].username
      }
    }
  }

  componentDidMount(){
    this.getPhotos();
    this.getUser();
  }

    render(){

      const photo = this.state.photo;
      const userId = this.state.userId;
      console.log(userId)
        return (
            <Container>
              <CardDeckMargin>
              <Row></Row>
              {
               photo.map((photo, i) => (
              <Card key={i}>
                <Card.Img variant="top" src={photo.url} />
                  <Card.Body>
                  <Card.Title>{photo.title}</Card.Title>
                  <Card.Text>
                  {photo.description}
                  </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Image src="https://picsum.photos/50/50" roundedCircle /><br />
                    <small className="text-muted"><Link to={`/profile/${photo.created_by}`}> Photo by: {this.getUsername(userId,photo.created_by)}</Link></small>
                </Card.Footer>
              </Card>
               ))
              }
            </CardDeckMargin>
            </Container>
        )
    }
}

export default Explore;