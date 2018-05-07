import React from 'react';
import request from 'superagent';
import Uploader from './upload';
import Result from './result';
import Info from './info';

export default class Extraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [
        {id: 1, type: "names", size: 7, content: "姓名"},
        {id: 2, type: "phone", size: 6, content: "手机号码"},
        {id: 3, type: "places", size: 10, content: "地点"},
        {id: 4, type: "e_mail", size: 8, content: "邮箱"},
        {id: 5, type: "id", size: 5, content: "身份证号码"},
        {id: 6, type: "passport", size: 4, content: "护照号码"},
        {id: 7, type: "car", size: 5, content: "车牌号码"},
        {id: 8, type: "date", size: 8, content: "日期"}
      ],
      items: [
        {
          header: '姓名',
          description: '',
          meta: '抽取数量: ',
        },
        {
          header: '电话／手机号码',
          description: '',
          meta: '抽取数量: ',
        },
        {
          header: '地点',
          description: '',
          meta: '抽取数量: ',
        },
        {
          header: '邮箱',
          description: '',
          meta: '抽取数量: ',
        },
        {
          header: '身份证',
          description: '',
          meta: '抽取数量: ',
        },
        {
          header: '护照',
          description: '',
          meta: '抽取数量: ',
        },
        {
          header: '车牌',
          description: '',
          meta: '抽取数量: ',
        },
        {
          header: '日期',
          description: '',
          meta: '抽取数量: ',
        }
      ],
      algo: ''
    };
  }

  componentWillMount() {
    request
      .get('http://202.120.40.69:12347/manage/status')
      .then(res => {
        const { text_calling } = res.body;
        this.setState({ algo: text_calling });
      })
  }

  getFile = res => {
    console.log(res.infoVOList);
    this.setState({
      result: res.infoVOList
    });
    let newItems = this.state.items;
    for (let i = 0; i < 8; ++i) {
      newItems[i].description = res.infoVOList[i].content.replace(/,/g, " ");
      newItems[i].meta = '抽取数量: ' + res.infoVOList[i].size.toString();
    }
    this.setState({
      items: newItems
    });
  }

  render() {
    const currentAlgo = this.state.algo;
    return (
      // <div style={{display: 'flex', width: '100%', height: '93%'}}>
      //   <div style={{width: '50%', height: '100%', backgroundColor: 'teal'}}>
      //     <Result res={this.state.result} />
      //   </div>
      //   <div style={{width: '50%', height: '100%', backgroundColor: 'green'}}>
      //     <Info items={this.state.items} />
      //   </div>
      // </div>

      <div style={{width: '100%', height: '92%'}}>
        <div style={{width: '100%', height: '5%'}}>
          <Uploader currentAlgo={currentAlgo} getfile={this.getFile} />
        </div>

        <div style={{display: 'flex', width: '100%', height: '95%'}}>
          <div style={{width: '50%', height: '100%'}}>
            <Result res={this.state.result} />
          </div>
          <div style={{width: '50%', height: '100%'}}>
            <Info items={this.state.items} />
          </div>
        </div>
    </div>
    );
  }
}