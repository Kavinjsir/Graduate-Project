import React from 'react';
import Carousel from 'nuka-carousel';
import { Card, Image } from 'semantic-ui-react';

export default class HomePage extends React.Component {
  render() {
    const ImgList = [
      "http://placehold.it/1000x400/ffffff/c0392b/&text=slide1",
      "http://placehold.it/1000x400/ffffff/c0392b/&text=slide2",
      "http://placehold.it/1000x400/ffffff/c0392b/&text=slide3"
    ]
    return (
      <div className="homepage">
      <Carousel
        autoplay={true}
        dragging={true}
        renderCenterLeftControls={null}
        renderCenterRightControls={null}
        cellSpacing={20}
      >
        {
                    ImgList.map(source => (
                      <Card color='blue' fluid centered>
                        <Card.Content>
                          <Image floated='right' src={source} size='massive' />
                          <Card.Header textAlign='right'>
                            source
                          </Card.Header>
                          <Card.Meta textAlign='right'>
                            {(new Date()).toLocaleDateString()}
                          </Card.Meta>
                          <Card.Description textAlign='center'>
                            Need for Details
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    ))
        }
      </Carousel>
      </div>
    );
  }
}