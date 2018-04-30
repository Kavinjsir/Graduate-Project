import React from 'react';
import { Grid } from 'semantic-ui-react';
import Uploader from './upload';
import Result from './result';
import Info from './info';

export default class Extraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      items: [
        {
          header: '姓名',
          description: '',
          meta: '可靠度: ',
        },
        {
          header: '电话／手机号码',
          description: '',
          meta: '可靠度: ',
        },
        {
          header: '地点',
          description: '',
          meta: '可靠度: ',
        },
        {
          header: '邮箱',
          description: '',
          meta: '可靠度: ',
        },
        {
          header: '身份证',
          description: '',
          meta: '可靠度: ',
        },
        {
          header: '护照',
          description: '',
          meta: '可靠度: ',
        },
        {
          header: '车牌',
          description: '',
          meta: '可靠度: ',
        },
        {
          header: '日期',
          description: '',
          meta: '可靠度: ',
        }
      ]
    };
  }

  getFile = res => {
    console.log(res.infoVOList);
    this.setState({
      result: res.infoVOList
    });
    let newItems = this.state.items;
    for (let i = 0; i < 8; ++i) {
      newItems[i].description = res.infoVOList[i].content;
      newItems[i].meta = '可靠度: ' + res.infoVOList[i].size.toString();
    }
    this.setState({
      items: newItems
    });
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Uploader getfile={this.getFile} />
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
          <Result res={this.state.result} />
          </Grid.Column>
          <Grid.Column>
            <Info items={this.state.items} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}