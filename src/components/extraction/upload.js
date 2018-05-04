import React from 'react';
import request from 'superagent';
import { Menu, Button, Breadcrumb } from 'semantic-ui-react';

export default class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extractState: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    if (this.refs.file == null || this.refs.file.files == null || this.refs.file.files.length === 0) {
      alert('invalid file');
      return;
    }
    this.setState({ extractState: 1});
    let formData = new FormData();
    let input = this.refs.file;
    let file = input.files[0];
    formData.append('file', file);
    alert(
      `正在抽取${file.name}中的信息......`
    );
    console.log(file);

    request
      .post('http://202.120.40.69:12347/text/extract')
      .send(formData)
      .end((err, res) => {
        if (err) {
          console.log(err);
          this.setState({ extractState: 3});
          alert('信息抽取失败', err);
          return;
        }
        this.setState({ extractState: 2});
        this.props.getfile(res.body);
      });
  }
  render() {
    const state = this.state.extractState;
    return (
      <Menu fluid borderless>
        <Menu.Item position='right'>
          {/* <Icon name='file text' size='large' color='black' inverted /> */}
          <Breadcrumb as={Button} color='teal' basic >
            <Breadcrumb.Section >执行算法</Breadcrumb.Section>
            <Breadcrumb.Divider icon='long arrow right' />
            <Breadcrumb.Section ><strong>&nbsp;&nbsp;{this.props.currentAlgo}</strong></Breadcrumb.Section>
          </Breadcrumb>
        </Menu.Item>
        <Menu.Item>
          <input type="file" ref='file' />
          <Button className='extractbtn' fluid basic content='上传' onClick={this.handleSubmit} />
        </Menu.Item>
        {/* <Menu.Item position='left'>
          <Button className='extractbtn' fluid basic content='上传' onClick={this.handleSubmit} />
        </Menu.Item> */}
        <Menu.Item position='left'>
          {state === 0 ? <Button fluid basic content='状态：可以上传' color='teal' /> : 
           state === 1 ? <Button fluid basic content='状态：正在分析' color='orange' /> :
           state === 2 ? <Button fluid basic content='状态：分析完成' color='teal' /> :
           state === 3 ? <Button fluid basic content='状态：分析失败' color='red' />:
           null
          }
        </Menu.Item>
      </Menu>
    );
  }
}