import React from 'react';
import Carousel from 'nuka-carousel';
import { Card, Image, Segment } from 'semantic-ui-react';

export default class HomePage extends React.Component {
  render() {
    const ImgList = [
      "http://placehold.it/1000x400/ffffff/c0392b/&text=slide1",
      "http://placehold.it/1000x400/ffffff/c0392b/&text=slide2",
      "http://placehold.it/1000x400/ffffff/c0392b/&text=slide3",
      "http://placehold.it/1000x400/ffffff/c0392b/&text=slide4",
      "http://placehold.it/1000x400/ffffff/c0392b/&text=slide5",
      "http://placehold.it/1000x400/ffffff/c0392b/&text=slide6"
    ]
    return (
      <div className="homepage">
      <Carousel clas autoplay={true}>
        {/* {
          ImgList.map(source => (
            <img src={source} />
          ))
        } */}
        {
                    ImgList.map(source => (
                      <Segment>
                      <Card centered>
                        <Card.Content>
                          <Image floated='right' src={source} size='huge' />
                          <Card.Header>
                            source
                          </Card.Header>
                          <Card.Meta>
                            {(new Date()).toLocaleDateString()}
                          </Card.Meta>
                          <Card.Description>
                            Need for Details
                          </Card.Description>
                        </Card.Content>
                      </Card>
                      </Segment>
                    ))
        }
      </Carousel>
      </div>
    );
  }
}