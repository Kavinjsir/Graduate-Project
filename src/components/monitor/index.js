import React from 'react';
import { Grid, List, Button } from 'semantic-ui-react';
import RegisterComp from './registerComponent';
import TransferComp from './transferComponent';
import UpgradeComp from './upgradeComponent';

export default class Monitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAlgo: '0',
      currentSection: 'register',
      algoList: [
        {
          id: '0',
          name: '朴素贝叶斯',
          status: '1',  // inlist
        },
        {
          id: '1',
          name: '逻辑回归',
          status: '0', //outlist
        },
        {
          id: '2',
          name: '支持向量机',
          status: '1',  // inlist
        },
        {
          id: '3',
          name: '决策树',
          status: '0',  // outlist
        }
      ],
    };
  }

  setSidebarSection = section => {
    this.setState({ currentSection: section });
  }

  getAlgo = status => {
    let algoList = this.state.algoList.filter(x => x.status === status);
    return algoList;
  }

  updateAlgoStatus = id => {
    let al = this.state.algoList.find(x => x.id === id);
    al.status = ('1' - al.status).toString();
    const newList = this.state.algoList.filter(x => x.id !== id);
    newList.push(al);
    console.log(al);
    this.setState({
      algoList: newList
    });
  }

  updateSelectedAlgo = id => {
    if (this.state.selectedAlgo === 'id') {
      alert('Already in use.');
      return;
    }
    this.setState({ selectedAlgo: id });
  }

  upgradeAlgo = id => {
    alert('upgrade need to do...');
  }

  showComponent = () => {
    if (this.state.currentSection === 'register') {
      return (
        <RegisterComp negList={this.getAlgo('0')} posList={this.getAlgo('1')} onUpdate={this.updateAlgoStatus} />
      );
    } else if (this.state.currentSection === 'execution') {
      return (
        <TransferComp currentAlgo={this.state.selectedAlgo} algoList={this.getAlgo('1')} onUpdate={this.updateSelectedAlgo} />
      );
    } else if (this.state.currentSection === 'upgrade') {
      return (
        <UpgradeComp currentAlgo={this.state.selectedAlgo} algoList={this.getAlgo('1')} onUpdate={this.upgradeAlgo} />
      );
    }
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={2}>
          <div className="monitor-sidebar">
            <List>
              <List.Item onClick={() => { this.setSidebarSection('register'); }}>
                <List.Content>
                  <Button circular fluid size='medium' content='算法注册' icon='mail outline' basic />
                </List.Content>
              </List.Item>
              <List.Item onClick={() => { this.setSidebarSection('execution'); }}>
                <List.Content>
                  <Button circular fluid size='medium' content='算法调用' icon='mail outline' basic />
                </List.Content>
              </List.Item>
              <List.Item onClick={() => { this.setSidebarSection('upgrade'); }}>
                <List.Content>
                  <Button circular fluid size='medium' content='算法升级' icon='mail outline' basic />
                </List.Content>
              </List.Item>
            </List>
          </div>
        </Grid.Column>
        <Grid.Column width={14}>
          <div className="monitor-detail">
            {this.showComponent()}
          </div>
        </Grid.Column>
      </Grid>
    )
  }
}