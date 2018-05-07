import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Header, List, Segment, Image } from 'semantic-ui-react';

import HomePage from './components/home/home';
import MailIndex from './components/mailFilter/index';
import Monitor from './components/monitor/index';
import Extraction from './components/extraction';
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div style={{height: '100%', width: '100%'}}>
          <Segment className='nav-bar'>
            <Header floated='left'>
              <Link to='/'>
                <Image src='http://oyy735z2r.bkt.clouddn.com/logo1.png' />
              </Link>
            </Header>
            <Header floated='left'>
              &nbsp;&nbsp;
            </Header>
            <Header>
            <List className='selection' horizontal relaxed>
              <List.Item>
                <List.Content>
                  <Link to='/mailmonitor' key='mailmonitor'>邮件监管</Link>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <Link to='/extraction' key='extraction'>信息抽取</Link>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <Link to='/administration' key='administration'>算法管理</Link>
                </List.Content>
              </List.Item>
            </List>
            </Header>
          </Segment>
          <Route exact path="/" component={HomePage} />
          <Route path='/mailmonitor' component={MailIndex} />
          <Route path='/administration' component={Monitor} />
          <Route path='/extraction' component={Extraction} />
        </div>
      </Router>
    )
  }
}

export default App;
