import React from 'react';
import request from 'superagent';
import { Menu, Button, Icon } from 'semantic-ui-react';

export default class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    if (this.refs.file == null || this.refs.file.files == null || this.refs.file.files.length === 0) {
      alert('invalid file');
      return;
    }
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
      });
  }
  render() {
    return (
      <Menu fluid borderless>
        <Menu.Item position='right'>
          <Icon name='file text' size='big' color='orange' inverted />
        </Menu.Item>
        <Menu.Item>
          <input type="file" ref='file' />
        </Menu.Item>
        <Menu.Item position='left'>
          <Button className='extractbtn' fluid basic content='上传' onClick={this.handleSubmit} />
        </Menu.Item>
      </Menu>
    );
  }
}