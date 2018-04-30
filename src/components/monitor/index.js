import React from 'react';
import { Grid, Button, Dropdown, Segment } from 'semantic-ui-react';

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
      preSelectMailAlgo: -1,
      preSelectInfoAlgo: -1,
      preUpgradeMailAlgo: -1,
      preUpgradeInfoAlgo: -1,
    };
  }

  getMailAlgo = status => {
    let algoList = this.state.mailAlgoList.filter(x => x.status === status);
    return algoList;
  }

  getInfoAlgo = status => {
    let algoList = this.state.infoAlgoList.filter(x => x.status === status);
    return algoList;
  }

  updateMailAlgoStatus = () => {
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

  updateInfoAlgoStatus = () => {
    if (this.state.preMailAlgoStatus == null) {
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

  updateSelectedMailAlgo = () => {
    if (this.state.preSelectMailAlgo == null) {
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
    if (this.state.preSelectInfoAlgo == null) {
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
    if (this.state.preUpgradeMailAlgo == null) {
      alert('无待升级算法，请选择...');
      return;
    }
    alert('mail algo upgrade need to do...');
  }

  upgradeInfoAlgo = () => {
    if (this.state.preUpgradeInfoAlgo == null) {
      alert('无待升级算法，请选择...');
      return;
    }
    alert('info algo upgrade need to do...');
  }

  render() {
    return (
      <Grid className="monitor" divided='vertically'>
        <Grid.Row columns={3} textAlign='center'>
          <Grid.Column as={Segment} width={1} secondary content='当前算法:' />
          <Grid.Column as={Segment} width={7} content={'邮件分类:' + this.state.mailAlgoList.find(x => x.id === this.state.selectedMailAlgo).text} />
          <Grid.Column as={Segment} width={8} content={'信息抽取:' + this.state.infoAlgoList.find(x => x.id === this.state.selectedInfoAlgo).text} />
        </Grid.Row>

        <Grid.Row columns={2} textAlign='center'>
          <Grid.Column as={Segment} width={1} secondary content='算法注册:' />
          <Grid.Column as={Grid} columns={2} width={15} >
            <Grid.Row columns={3} divided='vertically' >
              <Grid.Column width={1} >
                邮件分类
              </Grid.Column>
              <Grid.Column width={13} >
                <Dropdown
                  onChange={e => this.setState({ preMailAlgoStatus: e.currentTarget.id })}
                  options={this.getMailAlgo('0')}
                  placeholder='请选择一个待注册算法'
                  fluid
                  selection
                  text={this.state.preMailAlgoStatus >= 0 ? this.state.mailAlgoList[this.state.preMailAlgoStatus].text : null}
                />
              </Grid.Column>
              <Grid.Column as={Button} width={1} content='确认' onClick={this.updateMailAlgoStatus} />
            </Grid.Row >
            <Grid.Row columns={2} divided='vertically' >
              <Grid.Column width={1} >
                信息抽取
              </Grid.Column>
              <Grid.Column width={14} >
                <Dropdown />
              </Grid.Column>
            </Grid.Row >
          </Grid.Column>
        </Grid.Row >

        <Grid.Row columns={2} textAlign='center'>
          <Grid.Column as={Segment} width={1} secondary content='算法调用:' />
          <Grid.Column as={Grid} columns={2} width={15} >
            <Grid.Row columns={2} divided='vertically' >
              <Grid.Column width={1} >
                邮件分类
              </Grid.Column>
              <Grid.Column width={14} >
                <Dropdown />
              </Grid.Column>
            </Grid.Row >
            <Grid.Row columns={2} divided='vertically' >
              <Grid.Column width={1} >
                信息抽取
              </Grid.Column>
              <Grid.Column width={14} >
                <Dropdown />
              </Grid.Column>
            </Grid.Row >
          </Grid.Column>
        </Grid.Row >

        <Grid.Row columns={2} textAlign='center'>
          <Grid.Column as={Segment} width={1} secondary content='算法升级:' />
          <Grid.Column as={Grid} columns={2} width={15} >
            <Grid.Row columns={2} divided='vertically' >
              <Grid.Column width={1} >
                邮件分类
              </Grid.Column>
              <Grid.Column width={14} >
                <Dropdown />
              </Grid.Column>
            </Grid.Row >
            <Grid.Row columns={2} divided='vertically' >
              <Grid.Column width={1} >
                信息抽取
              </Grid.Column>
              <Grid.Column width={14} >
                <Dropdown />
              </Grid.Column>
            </Grid.Row >
          </Grid.Column>
        </Grid.Row >
      </Grid>
    );
  }
}