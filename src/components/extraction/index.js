import React from 'react';
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
      <div className='extraction'>
        <Uploader getfile={this.getFile} />
        <Result res={this.state.result} />
      </div>
    );
  }
}