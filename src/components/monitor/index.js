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
      60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentWillMount() {
    request
    .get('http://202.120.40.69:12347/manage/status')
    .then(res => {
      console.log(res);
      const { email_calling, email_registered, email_unregistered, text_calling, text_registered, text_unregistered } = res.body;
      let mailList = [];
      for (const e of email_registered) {
        let idx = mailList.length.toString();
        mailList.push({
          id: idx,
          key: idx,
          text: e,
          status: '1'
        });
      }
      for (const e of email_unregistered) {
        let idx = mailList.length.toString();
        mailList.push({
          id: idx,
          key: idx,
          text: e,
          status: '0'
        });
      }

      let infoList = [];
      for (const i of text_registered) {
        let idx = infoList.length.toString();
        infoList.push({
          id: idx,
          key: idx,
          text: i,
          status: '1'
        });
      }
      for (const i of text_unregistered) {
        let idx = infoList.length.toString();
        infoList.push({
          id: idx,
          key: idx,
          text: i,
          status: '0'
        });
      }

      this.setState({
        selectedMailAlgo: email_calling,
        selectedInfoAlgo: text_calling,
        mailAlgoList: mailList,
        infoAlgoList: infoList
      });
    })
    .catch(error => {
      console.log(error);
      alert('无法获取算法信息');
    });
  }

  tick() {
    request
      .get('http://202.120.40.69:12347/manage/status')
      .then(res => {
        console.log(res);
        const { email_calling, email_registered, email_unregistered, text_calling, text_registered, text_unregistered } = res.body;
        let mailList = [];
        for (const e of email_registered) {
          let idx = mailList.length.toString();
          mailList.push({
            id: idx,
            key: idx,
            text: e,
            status: '1'
          });
        }
        for (const e of email_unregistered) {
          let idx = mailList.length.toString();
          mailList.push({
            id: idx,
            key: idx,
            text: e,
            status: '0'
          });
        }

        let infoList = [];
        for (const i of text_registered) {
          let idx = infoList.length.toString();
          infoList.push({
            id: idx,
            key: idx,
            text: i,
            status: '1'
          });
        }
        for (const i of text_unregistered) {
          let idx = infoList.length.toString();
          infoList.push({
            id: idx,
            key: idx,
            text: i,
            status: '0'
          });
        }

        this.setState({
          selectedMailAlgo: email_calling,
          selectedInfoAlgo: text_calling,
          mailAlgoList: mailList,
          infoAlgoList: infoList
        });
      })
      .catch(error => {
        console.log(error);
        alert('无法获取算法信息');
      });
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
    
    const parameter = {
      name: al.text,
      type: 'email'
    };
    request
      .post('http://202.120.40.69:12347/manage/register')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(parameter))
      .then( res => {
        console.log(res);
        // After succeed in server side
        al.status = ('1' - al.status).toString();
        const newList = this.state.mailAlgoList.filter(x => x.id !== id);
        newList.push(al);
        console.log(al);
        this.setState({
          mailAlgoList: newList
        });
        alert('注册成功');
      })
      .catch( error => {
        console.log(error);
        alert('注册失败');
      })
  }

  updateDeleteMailAlgoStatus = () => {
    if (this.state.preDeleteMailAlgo == null || this.state.preDeleteMailAlgo < 0) {
      alert('无待卸载算法，请选择...');
      return;
    }
    const id = this.state.preDeleteMailAlgo;
    let al = this.state.mailAlgoList.find(x => x.id === id);
    if (al.text === this.state.selectedMailAlgo) {
      alert('不能卸载正在调用中的算法');
      return;
    }
    const parameter = {
      name: al.text,
      type: 'email'
    };
    request
      .post('http://202.120.40.69:12347/manage/unregister')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(parameter))
      .then( res => {
        console.log(res);
        // After succeed in server side
        al.status = ('1' - al.status).toString();
        const newList = this.state.mailAlgoList.filter(x => x.id !== id);
        newList.push(al);
        console.log(al);
        this.setState({
          mailAlgoList: newList
        });
        alert('卸载成功');
      })
      .catch( error => {
        console.log(error);
        alert('卸载失败');
      })
  }

  updatePreInfoAlgoStatus = () => {
    if (this.state.preInfoAlgoStatus == null || this.state.preInfoAlgoStatus < 0) {
      alert('无待注册算法，请选择...');
      return;
    }
    const id = this.state.preInfoAlgoStatus;
    let al = this.state.infoAlgoList.find(x => x.id === id);
    const parameter = {
      name: al.text,
      type: 'text'
    };
    request
    .post('http://202.120.40.69:12347/manage/register')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(parameter))
    .then( res => {
      console.log('info algo register', res);
      // After succeed in server side
      al.status = ('1' - al.status).toString();
      const newList = this.state.infoAlgoList.filter(x => x.id !== id);
      newList.push(al);
      console.log(al);
      this.setState({
        infoAlgoList: newList
      });
      alert('注册成功');
    })
    .catch( error => {
      console.log('info alo register error', error);
      alert('注册失败');
    });
  }

  updateDeleteInfoAlgoStatus = () => {
    if (this.state.preDeleteInfoAlgo == null || this.state.preDeleteInfoAlgo < 0) {
      alert('无待卸载算法，请选择...');
      return;
    }
    const id = this.state.preDeleteInfoAlgo;
    let al = this.state.infoAlgoList.find(x => x.id === id);
    if (al.text === this.state.selectedInfoAlgo) {
      alert('不能卸载正在调用中的算法');
      return;
    }
    const parameter = {
      name: al.text,
      type: 'text'
    };
    request
    .post('http://202.120.40.69:12347/manage/unregister')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(parameter))
    .then( res => {
      console.log('info algo unregister', res);
      // After succeed in server side
      al.status = ('1' - al.status).toString();
      const newList = this.state.infoAlgoList.filter(x => x.id !== id);
      newList.push(al);
      console.log(al);
      this.setState({
        infoAlgoList: newList
      });
      alert('卸载成功');
    })
    .catch( error => {
      console.log('info algo unregister error', error);
      alert('卸载失败');
    });
  }

  updateSelectedMailAlgo = () => {
    if (this.state.preSelectMailAlgo == null || this.state.preSelectMailAlgo < 0) {
      alert('无待调用算法，请选择...');
      return;
    }
    const id = this.state.preSelectMailAlgo;
    let al = this.state.mailAlgoList.find(x => x.id === id);
    if (this.state.selectedMailAlgo === al.text) {
      alert('该算法已处于调用状态');
      return;
    }
    const parameter = {
      name: al.text,
      type: 'email'
    };
    request
      .post('http://202.120.40.69:12347/manage/calling')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(parameter))
      .then( res => {
        console.log('calling result',res);
        alert('调用成功');
        this.setState({ selectedMailAlgo: al.text });
      })
      .catch( error => {
        console.log('calling failed', error);
        alert('调用失败');
      });
  }

  updateSelectedInfoAlgo = () => {
    if (this.state.preSelectInfoAlgo == null || this.state.preSelectInfoAlgo < 0) {
      alert('无待调用算法，请选择...');
      return;
    }
    const id = this.state.preSelectInfoAlgo;
    const al = this.state.infoAlgoList.find(x => x.id === id);
    if (this.state.selectedInfoAlgo === al.text) {
      alert('该算法已处于调用状态');
      return;
    }
    const parameter = {
      name: al.text,
      type: 'text'
    };
    request
      .post('http://202.120.40.69:12347/manage/calling')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(parameter))
      .then( res => {
        console.log('info calling result',res);
        alert('调用成功');
        this.setState({ selectedInfoAlgo: al.text });
      })
      .catch( error => {
        console.log('info calling failed', error);
        alert('调用失败');
      });
  }

  upgradeMailAlgo = () => {
    if (this.state.preUpgradeMailAlgo == null || this.state.preUpgradeMailAlgo < 0) {
      alert('无待升级算法，请选择...');
      return;
    }
    const id = this.state.preUpgradeMailAlgo;
    const al = this.state.mailAlgoList.find(x => x.id === id);
    if (this.state.selectedMailAlgo === al.text) {
      alert('不能升级正在调用中的算法');
      return;
    }
    const parameter = {
      name: al.text,
      type: 'email'
    };
    request
      .post('http://202.120.40.69:12347/manage/update')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(parameter))
      .then( res => {
        console.log('mail algo upgrade', res);
        al.status = '-1';
        const newList = this.state.mailAlgoList.filter(x => x.id !== al.id);
        newList.push(al)
        this.setState({
          mailAlgoList: newList
        });
        alert('请求成功。');
      })
      .catch( error => {
        console.log('mail alog upgrade failed', error);
        alert('算法升级申请失败');
      });
  }

  upgradeInfoAlgo = () => {
    if (this.state.preUpgradeInfoAlgo == null || this.state.preUpgradeInfoAlgo < 0) {
      alert('无待升级算法，请选择...');
      return;
    }
    const id = this.state.preUpgradeInfoAlgo;
    const al = this.state.infoAlgoList.find(x => x.id === id);
    if (this.state.selectedInfoAlgo === al.text) {
      alert('不能升级正在调用中的算法');
      return;
    }
    const parameter = {
      name: al.text,
      type: 'text'
    };
    request
      .post('http://202.120.40.69:12347/manage/update')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(parameter))
      .then( res => {
        console.log('info algo upgrade', res);
        al.status = '-1';
        const newList = this.state.infoAlgoList.filter(x => x.id !== al.id);
        newList.push(al);
        this.setState({
          infoAlgoList: newList
        });
        alert('请求成功。');
      })
      .catch( error => {
        console.log('info algo upgrade failed', error);
        alert('算法升级申请失败');
      });
  }

  render() {
    return (
      <div>
        <br />
        <Segment.Group size='mini' horizontal>
          <Segment textAlign='center' >{'邮件分类:' + this.state.selectedMailAlgo}</Segment>
          <Segment textAlign='center' >{'信息抽取:' + this.state.selectedInfoAlgo}</Segment>
        </Segment.Group>
        <Grid divided='vertically'>
          <Grid.Row columns={2} textAlign='center'>
            <Grid.Column as={Button} basic width={1} secondary><div className='shuxiang'>算法注册</div></Grid.Column>
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
                {/* <Grid.Column width={1} as={Button} content='注册' onClick={this.updatePreMailAlgoStatus} /> */}
                <Grid.Column width={2} textAlign='left' > <Button content='注册' color='teal' basic onClick={this.updatePreMailAlgoStatus} /> </Grid.Column>
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
                {/* <Grid.Column width={1} as={Button} content='注册' onClick={this.updatePreInfoAlgoStatus} /> */}
                <Grid.Column width={2} textAlign='left' > <Button content='注册' color='teal' basic onClick={this.updatePreInfoAlgoStatus} /> </Grid.Column>
              </Grid.Row >

            </Grid.Column>
          </Grid.Row >

          {/**************************************************************************************/}

          <Grid.Row columns={2} textAlign='center'>
            <Grid.Column as={Button} basic width={1} secondary><div className='shuxiang'>算法卸载</div></Grid.Column>
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
                {/* <Grid.Column width={1} as={Button} content='卸载' onClick={this.updateDeleteMailAlgoStatus} /> */}
                <Grid.Column width={2} textAlign='left' > <Button content='卸载' color='teal' basic onClick={this.updateDeleteMailAlgoStatus} /> </Grid.Column>
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
                {/* <Grid.Column width={1} as={Button} content='卸载' onClick={this.updateDeleteInfoAlgoStatus} /> */}
                <Grid.Column width={2} textAlign='left' > <Button content='卸载' color='teal' basic onClick={this.updateDeleteInfoAlgoStatus} /> </Grid.Column>
              </Grid.Row >

            </Grid.Column>
          </Grid.Row >

          {/**************************************************************************************/}

          <Grid.Row columns={2} textAlign='center'>
            <Grid.Column as={Button} basic width={1} secondary><div className='shuxiang'>算法调用</div></Grid.Column>
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
                {/* <Grid.Column width={1} as={Button} content='调用' onClick={this.updateSelectedMailAlgo} /> */}
                <Grid.Column width={2} textAlign='left' > <Button content='调用' color='teal' basic onClick={this.updateSelectedMailAlgo} /> </Grid.Column>
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
                {/* <Grid.Column width={1} as={Button} content='调用' onClick={this.updateSelectedInfoAlgo} /> */}
                <Grid.Column width={2} textAlign='left' > <Button content='调用' color='teal' basic onClick={this.updateSelectedInfoAlgo} /> </Grid.Column>
              </Grid.Row >

            </Grid.Column>
          </Grid.Row >

          {/**************************************************************************************/}

          <Grid.Row columns={2} textAlign='center'>
            <Grid.Column as={Button} basic width={1} secondary><div className='shuxiang'>算法升级</div></Grid.Column>
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
                    text={(this.state.preUpgradeMailAlgo >= 0) && (this.state.mailAlgoList.find(x => x.id === this.state.preUpgradeMailAlgo)) ? this.state.mailAlgoList.find(x => x.id === this.state.preUpgradeMailAlgo).text : null}
                  />
                </Grid.Column>
                {/* <Grid.Column width={1} as={Button} content='升级' onClick={this.upgradeMailAlgo} /> */}
                <Grid.Column width={2} textAlign='left' > <Button content='升级' color='teal' basic onClick={this.upgradeMailAlgo} /> </Grid.Column>
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
                    text={(this.state.preUpgradeInfoAlgo >= 0) && (this.state.infoAlgoList.find(x => x.id === this.state.preUpgradeInfoAlgo)) ? this.state.infoAlgoList.find(x => x.id === this.state.preUpgradeInfoAlgo).text : null}
                  />
                </Grid.Column>
                {/* <Grid.Column width={1} as={Button} content='升级' onClick={this.upgradeInfoAlgo} /> */}
                <Grid.Column width={2} textAlign='left' > <Button content='升级' color='teal' basic onClick={this.upgradeInfoAlgo} /> </Grid.Column>
              </Grid.Row >

            </Grid.Column>
          </Grid.Row >
        </Grid>
      </div>
    );
  }
}