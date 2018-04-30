import React from 'react';
import { Grid, Button, Dropdown, Segment } from 'semantic-ui-react';
import request from 'superagent';

export default class Monitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMailAlgo: '0',
      selectedInfoAlgo: '0',
      mailAlgoList: [
        {
          id: '0',
          key: '0',
          text: '朴素贝叶斯',
          status: '1',  // inlist
        },
        {
          id: '1',
          key: '1',
          text: '逻辑回归',
          status: '0', //outlist
        },
        {
          id: '2',
          key: '2',
          text: '支持向量机',
          status: '1',  // inlist
        },
        {
          id: '3',
          key: '3',
          text: '决策树',
          status: '0',  // outlist
        }
      ],
      infoAlgoList: [
        {
          id: '0',
          key: '0',
          text: 'KNN',
          status: '1',  // inlist
        },
        {
          id: '1',
          key: '1',
          text: 'K-MEANS',
          status: '0', //outlist
        },
        {
          id: '2',
          key: '2',
          text: 'CNN',
          status: '1',  // inlist
        },
        {
          id: '3',
          key: '3',
          text: 'RNN',
          status: '0',  // outlist
        }
      ],
      preMailAlgoStatus: -1,
      preInfoAlgoStatus: -1,
      preDeleteMailAlgo: -1,
      preDeleteInfoAlgo: -1,
      preSelectMailAlgo: -1,
      preSelectInfoAlgo: -1,
      preUpgradeMailAlgo: -1,
      preUpgradeInfoAlgo: -1,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const m = [
      {
        id: '0',
        key: '0',
        text: '朴素贝叶斯' + (new Date()).toLocaleTimeString(),
        status: '1',  // inlist
      },
      {
        id: '1',
        key: '1',
        text: '逻辑回归' + (new Date()).toLocaleTimeString(),
        status: '0', //outlist
      },
      {
        id: '2',
        key: '2',
        text: '支持向量机' + (new Date()).toLocaleTimeString(),
        status: '1',  // inlist
      },
      {
        id: '3',
        key: '3',
        text: '决策树' + (new Date()).toLocaleTimeString(),
        status: '0',  // outlist
      }
    ];
    const i = [
      {
        id: '0',
        key: '0',
        text: 'KNN' + (new Date()).toLocaleTimeString(),
        status: '1',  // inlist
      },
      {
        id: '1',
        key: '1',
        text: 'K-MEANS' + (new Date()).toLocaleTimeString(),
        status: '0', //outlist
      },
      {
        id: '2',
        key: '2',
        text: 'CNN' + (new Date()).toLocaleTimeString(),
        status: '1',  // inlist
      },
      {
        id: '3',
        key: '3',
        text: 'RNN' + (new Date()).toLocaleTimeString(),
        status: '0',  // outlist
      }
    ];
    this.setState({
      mailAlgoList: m,
      infoAlgoList: i,
    })
  }

  getMailAlgo = status => {
    let algoList = this.state.mailAlgoList.filter(x => x.status === status);
    return algoList;
  }

  getInfoAlgo = status => {
    let algoList = this.state.infoAlgoList.filter(x => x.status === status);
    return algoList;
  }

  updatePreMailAlgoStatus = () => {
    if (this.state.preMailAlgoStatus == null || this.state.preMailAlgoStatus < 0) {
      alert('无待注册算法，请选择...');
      return;
    }
    const id = this.state.preMailAlgoStatus;
    let al = this.state.mailAlgoList.find(x => x.id === id);
    al.status = ('1' - al.status).toString();
    const newList = this.state.mailAlgoList.filter(x => x.id !== id);
    newList.push(al);
    console.log(al);
    this.setState({
      mailAlgoList: newList
    });
  }

  updateDeleteMailAlgoStatus = () => {
    if (this.state.preDeleteMailAlgo == null || this.state.preDeleteMailAlgo < 0) {
      alert('无待卸载算法，请选择...');
      return;
    }
    const id = this.state.preDeleteMailAlgo;
    let al = this.state.mailAlgoList.find(x => x.id === id);
    al.status = ('1' - al.status).toString();
    const newList = this.state.mailAlgoList.filter(x => x.id !== id);
    newList.push(al);
    console.log(al);
    this.setState({
      mailAlgoList: newList
    });
  }

  updatePreInfoAlgoStatus = () => {
    if (this.state.preInfoAlgoStatus == null || this.state.preInfoAlgoStatus < 0) {
      alert('无待注册算法，请选择...');
      return;
    }
    const id = this.state.preInfoAlgoStatus;
    let al = this.state.infoAlgoList.find(x => x.id === id);
    al.status = ('1' - al.status).toString();
    const newList = this.state.infoAlgoList.filter(x => x.id !== id);
    newList.push(al);
    console.log(al);
    this.setState({
      infoAlgoList: newList
    });
  }

  updateDeleteInfoAlgoStatus = () => {
    if (this.state.preDeleteInfoAlgo == null || this.state.preDeleteInfoAlgo < 0) {
      alert('无待卸载算法，请选择...');
      return;
    }
    const id = this.state.preDeleteInfoAlgo;
    let al = this.state.infoAlgoList.find(x => x.id === id);
    al.status = ('1' - al.status).toString();
    const newList = this.state.infoAlgoList.filter(x => x.id !== id);
    newList.push(al);
    console.log(al);
    this.setState({
      infoAlgoList: newList
    });
  }

  updateSelectedMailAlgo = () => {
    if (this.state.preSelectMailAlgo == null || this.state.preSelectMailAlgo < 0) {
      alert('无待调用算法，请选择...');
      return;
    }
    const id = this.state.preSelectMailAlgo;
    if (this.state.selectedMailAlgo === id) {
      alert('该算法已处于调用状态');
      return;
    }
    this.setState({ selectedMailAlgo: id });
  }

  updateSelectedInfoAlgo = () => {
    if (this.state.preSelectInfoAlgo == null || this.state.preSelectInfoAlgo < 0) {
      alert('无待调用算法，请选择...');
      return;
    }
    const id = this.state.preSelectInfoAlgo;
    if (this.state.selectedInfoAlgo === id) {
      alert('该算法已处于调用状态');
      return;
    }
    this.setState({ selectedInfoAlgo: id });
  }

  upgradeMailAlgo = () => {
    if (this.state.preUpgradeMailAlgo == null || this.state.preUpgradeMailAlgo < 0) {
      alert('无待升级算法，请选择...');
      return;
    }
    request
      .post('http://202.120.40.69:12346/updatemodel')
      .set('Content-Type', 'application//json')
      .send('{"model": "svm"}')
      .end((err, res) => {
        if (err) {
          console.log(err);
          alert('sth. went wrong...', err);
          return;
        }
        alert(res.body);
      });
  }

  upgradeInfoAlgo = () => {
    if (this.state.preUpgradeInfoAlgo == null || this.state.preUpgradeInfoAlgo < 0) {
      alert('无待升级算法，请选择...');
      return;
    }
    alert('info algo upgrade need to do...');
  }

  render() {
    return (
      <div>
        <br />
        <Segment.Group size='mini' horizontal>
          <Segment textAlign='center' >{'邮件分类:' + this.state.mailAlgoList.find(x => x.id === this.state.selectedMailAlgo).text}</Segment>
          <Segment textAlign='center' >{'信息抽取:' + this.state.infoAlgoList.find(x => x.id === this.state.selectedInfoAlgo).text}</Segment>
        </Segment.Group>
        <Grid divided='vertically'>
          <Grid.Row columns={2} textAlign='center'>
            <Grid.Column as={Segment} width={1} secondary content='算法注册:' />
            <Grid.Column as={Grid} columns={2} width={15} >

              <Grid.Row columns={3} divided='vertically' >

                <Grid.Column width={1} > 邮件分类 </Grid.Column>
                <Grid.Column width={13} >
                  <Dropdown
                    onChange={e => this.setState({ preMailAlgoStatus: e.currentTarget.id })}
                    options={this.getMailAlgo('0')}
                    placeholder='请选择一个待注册算法'
                    fluid
                    selection
                    text={this.state.preMailAlgoStatus >= 0 ? this.state.mailAlgoList.find(x => x.id === this.state.preMailAlgoStatus).text : null}
                  />
                </Grid.Column>
                <Grid.Column width={1} as={Button} content='确认' onClick={this.updatePreMailAlgoStatus} />

              </Grid.Row >

              <Grid.Row columns={3} divided='vertically' >
                <Grid.Column width={1} > 信息抽取 </Grid.Column>
                <Grid.Column width={13} >
                  <Dropdown
                    onChange={e => this.setState({ preInfoAlgoStatus: e.currentTarget.id })}
                    options={this.getInfoAlgo('0')}
                    placeholder='请选择一个待注册算法'
                    fluid
                    selection
                    text={this.state.preInfoAlgoStatus >= 0 ? this.state.infoAlgoList.find(x => x.id === this.state.preInfoAlgoStatus).text : null}
                  />
                </Grid.Column>
                <Grid.Column width={1} as={Button} content='确认' onClick={this.updatePreInfoAlgoStatus} />
              </Grid.Row >

            </Grid.Column>
          </Grid.Row >

          {/**************************************************************************************/}

          <Grid.Row columns={2} textAlign='center'>
            <Grid.Column as={Segment} width={1} secondary content='算法卸载:' />
            <Grid.Column as={Grid} columns={2} width={15} >

              <Grid.Row columns={3} divided='vertically' >
                <Grid.Column width={1} > 邮件分类 </Grid.Column>
                <Grid.Column width={13} >
                  <Dropdown
                    onChange={e => this.setState({ preDeleteMailAlgo: e.currentTarget.id })}
                    options={this.getMailAlgo('1')}
                    placeholder='请选择一个待卸载算法'
                    fluid
                    selection
                    text={this.state.preDeleteMailAlgo >= 0 ? this.state.mailAlgoList.find(x => x.id === this.state.preDeleteMailAlgo).text : null}
                  />
                </Grid.Column>
                <Grid.Column width={1} as={Button} content='确认' onClick={this.updateDeleteMailAlgoStatus} />
              </Grid.Row >

              <Grid.Row columns={3} divided='vertically' >
                <Grid.Column width={1} > 信息抽取 </Grid.Column>
                <Grid.Column width={13} >
                  <Dropdown
                    onChange={e => this.setState({ preDeleteInfoAlgo: e.currentTarget.id })}
                    options={this.getInfoAlgo('1')}
                    placeholder='请选择一个待卸载算法'
                    fluid
                    selection
                    text={this.state.preDeleteInfoAlgo >= 0 ? this.state.infoAlgoList.find(x => x.id === this.state.preDeleteInfoAlgo).text : null}
                  />
                </Grid.Column>
                <Grid.Column width={1} as={Button} content='确认' onClick={this.updateDeleteInfoAlgoStatus} />
              </Grid.Row >

            </Grid.Column>
          </Grid.Row >

          {/**************************************************************************************/}

          <Grid.Row columns={2} textAlign='center'>
            <Grid.Column as={Segment} width={1} secondary content='算法调用:' />
            <Grid.Column as={Grid} columns={2} width={15} >

              <Grid.Row columns={3} divided='vertically' >
                <Grid.Column width={1} > 邮件分类 </Grid.Column>
                <Grid.Column width={13} >
                  <Dropdown
                    onChange={e => this.setState({ preSelectMailAlgo: e.currentTarget.id })}
                    options={this.getMailAlgo('1')}
                    placeholder='请选择一个待调用算法'
                    fluid
                    selection
                    text={this.state.preSelectMailAlgo >= 0 ? this.state.mailAlgoList.find(x => x.id === this.state.preSelectMailAlgo).text : null}
                  />
                </Grid.Column>
                <Grid.Column width={1} as={Button} content='确认' onClick={this.updateSelectedMailAlgo} />
              </Grid.Row >

              <Grid.Row columns={3} divided='vertically' >
                <Grid.Column width={1} > 信息抽取 </Grid.Column>
                <Grid.Column width={13} >
                  <Dropdown
                    onChange={e => this.setState({ preSelectInfoAlgo: e.currentTarget.id })}
                    options={this.getInfoAlgo('1')}
                    placeholder='请选择一个待调用算法'
                    fluid
                    selection
                    text={this.state.preSelectInfoAlgo >= 0 ? this.state.infoAlgoList.find(x => x.id === this.state.preSelectInfoAlgo).text : null}
                  />
                </Grid.Column>
                <Grid.Column width={1} as={Button} content='确认' onClick={this.updateSelectedInfoAlgo} />
              </Grid.Row >

            </Grid.Column>
          </Grid.Row >

          {/**************************************************************************************/}

          <Grid.Row columns={2} textAlign='center'>
            <Grid.Column as={Segment} width={1} secondary content='算法升级:' />
            <Grid.Column as={Grid} columns={2} width={15} >

              <Grid.Row columns={3} divided='vertically' >
                <Grid.Column width={1} > 邮件分类 </Grid.Column>
                <Grid.Column width={13} >
                  <Dropdown
                    onChange={e => this.setState({ preUpgradeMailAlgo: e.currentTarget.id })}
                    options={this.getMailAlgo('1')}
                    placeholder='请选择一个待升级算法'
                    fluid
                    selection
                    text={this.state.preUpgradeMailAlgo >= 0 ? this.state.mailAlgoList.find(x => x.id === this.state.preUpgradeMailAlgo).text : null}
                  />
                </Grid.Column>
                <Grid.Column width={1} as={Button} content='确认' onClick={this.upgradeMailAlgo} />
              </Grid.Row >

              <Grid.Row columns={3} divided='vertically' >
                <Grid.Column width={1} > 信息抽取 </Grid.Column>
                <Grid.Column width={13} >
                  <Dropdown
                    onChange={e => this.setState({ preUpgradeInfoAlgo: e.currentTarget.id })}
                    options={this.getInfoAlgo('1')}
                    placeholder='请选择一个待升级算法'
                    fluid
                    selection
                    text={this.state.preUpgradeInfoAlgo >= 0 ? this.state.infoAlgoList.find(x => x.id === this.state.preUpgradeInfoAlgo).text : null}
                  />
                </Grid.Column>
                <Grid.Column width={1} as={Button} content='确认' onClick={this.upgradeInfoAlgo} />
              </Grid.Row >

            </Grid.Column>
          </Grid.Row >
        </Grid>
      </div>
    );
  }
}