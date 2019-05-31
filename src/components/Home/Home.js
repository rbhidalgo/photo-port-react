import React, {Component} from 'react';
import {Carousel, Container, Row, Col, Button} from 'react-bootstrap'
import styled from 'styled-components'
import AddPhoto from '../AddPhoto/AddPhoto';

const BackgroundCarousel = styled(Carousel) `
    width: 80%;
    height: 10%;
`
const BackgroundRow = styled(Row) `
    height: 100vh;
    width: 100wh;
    background-image: url("../images/bkg1.svg");

`
const CarouselItem = styled(Carousel.Item) `
    margin-top: 40px;

`

class Home extends Component {
    render(){
    const {creator} = this.props
    console.log(creator)
    return (
        <Container>
            <Carousel>
                <CarouselItem>
                    <img
                    className="d-block w-100"
                    src="https://picsum.photos/id/851/600/400"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h6>Global network for photographers</h6>
            <h1>Upload Photos</h1>
            <Button variant="outline-info" size="lg">Sign Up</Button>
                </Carousel.Caption>
                </CarouselItem>
                <CarouselItem>
                    <img
                    className="d-block w-100"
                    src="https://picsum.photos/id/1025/600/400"
                    alt="First slide"
                    />
                                        <Carousel.Caption>
                                        <h6>Global network for photographers</h6>
                    <h1>Share Photos</h1><Button variant="outline-info" size="lg">Sign Up</Button>
                </Carousel.Caption>
                </CarouselItem>
                <CarouselItem>
                    <img
                    className="d-block w-100"
                    src="https://picsum.photos/id/883/600/400"
                    alt="Second slide"
                    />

                        <Carousel.Caption>
                    <h6>Global network for photographers</h6>
                    <h1>Discover Photos</h1>
                    <Button variant="outline-info" size="lg">Sign Up</Button>
                </Carousel.Caption>

                </CarouselItem>
                <CarouselItem>
                    <img
                    className="d-block w-100"
                    src="https://picsum.photos/id/872/600/400"
                    alt="First slide"
                    />

                    <Carousel.Caption>
                    <h6>Global network for photographers</h6>
                    <h1>Discover Photos</h1>
                    <Button variant="outline-info" size="lg">Sign Up</Button>
                </Carousel.Caption>


                </CarouselItem>
            </Carousel>

        </Container>
    )};
}

export default Home