import React from 'react';
import request from 'superagent';

export default class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extractState: 0,
      name: '选择文件'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    if (this.refs.file == null || this.refs.file.files == null || this.refs.file.files.length === 0) {
      alert('invalid file');
      return;
    }
    this.setState({ extractState: 1 });
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
          this.setState({ extractState: 3 });
          alert('信息抽取失败', err);
          return;
        }
        this.setState({ extractState: 2 });
        this.props.getfile(res.body);
      });
  }

  showFileName = () => {
    if(this.refs.file == null || this.refs.file.files == null || this.refs.file.files.length === 0) return;
    else {
      this.setState({ name: this.refs.file.files[0].name});
    }
  }

  render() {
    const state = this.state.extractState;
    const name = this.state.name;
    return (
      <div style={{ display: 'flex', width: '100%', justifyContent:'center', fontSize: '16px' }}>
        <div style={{color: '#18435A', cursor: 'pointer'}}>
          执行算法 --> {this.props.currentAlgo}
        </div>
        <div style={{ display: 'flex', paddingLeft: '2%', paddingRight: '2%' }}>
          <label className="custom-file-upload">
            <input type="file" ref='file' onChange={this.showFileName} />
            &nbsp;&nbsp;
            {name}
            &nbsp;&nbsp;
          </label>
          <div className="upload-button" onClick={this.handleSubmit}>&nbsp;&nbsp;上传&nbsp;&nbsp;</div>
        </div>
        {state === 0 ? <div className="extraction-result" style={{color: 'teal'}}>状态：可以上传</div> :
          state === 1 ? <div className="extraction-result" style={{color: 'orange'}}>状态：正在分析</div> :
            state === 2 ? <div className="extraction-result" style={{color: 'teal'}}>状态：分析完成</div> :
              state === 3 ? <div className="extraction-result" style={{color: 'red'}}>状态：分析失败</div> :
                null
        }
      </div>
    );
  }
}