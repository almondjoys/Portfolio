import React, { Component } from 'react';

import './ImageViewer.css';


import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Jumbotron,
  Col, Row, Button
} from 'reactstrap';
import {withRouter} from 'react-router';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.ViewProject = this.ViewProject.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.images.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.images.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  ViewProject(name){
    this.props.history.push('/projects/'+name);
  }
  componentDidMount(){
    console.log(this.props.history)
  }
  render() {
    const { activeIndex } = this.state;

    const slides = this.props.images.map((img) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={img}>

          <Row id = "carousel-item-ct">
          <Col id = "img-col" style = {{padding: 0}}>
            <img src = {img} />
          </Col>
          </Row>
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        data-interval="false"
      >
        <CarouselIndicators items={this.props.images} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl id = 'control-left' direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl id = 'control-right' direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default withRouter(Projects);
