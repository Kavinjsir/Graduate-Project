import React from 'react';
import request from 'superagent';

export default class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    let formData = new FormData();
    let input = this.refs.file;
    let file = input.files[0];
    formData.append('file', file);
    alert(
      `Selected file - ${file.name}`
    );
    console.log(file);

    request
      .post('http://202.120.40.69:12347/text/extract')
      .send(formData)
      .end((err, res) => {
        if (err) {
          console.log(err);
          alert('sth. wrong,', err);
          return;
        }
        this.props.getfile(res.body);
      })
  }
  render() {
    return (
      <div>
        文件选取<input type="file" ref='file' />
        <button onClick={this.handleSubmit}>上传</button>
      </div>
    );
  }
}