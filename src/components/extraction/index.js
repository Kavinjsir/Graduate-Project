import React from 'react';
import { Grid } from 'semantic-ui-react';
import Uploader from './upload';
import Result from './result';

export default class Extraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: []
    };
  }

  getFile = async res => {
    console.log(res);
    this.setState({
      result: res.infoVOList
    });
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Uploader getfile={this.getFile} />
        </Grid.Row>
        <Grid.Row>
          <Result res={this.state.result} />
        </Grid.Row>
      </Grid>
    );
  }
}