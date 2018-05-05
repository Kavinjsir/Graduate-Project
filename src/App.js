import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import HomePage from './components/home/home';
import MailIndex from './components/mailFilter/index';
import Monitor from './components/monitor/index';
import Extraction from './components/extraction';
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <div className='title'>
            <img alt='logo' src='http://oyy735z2r.bkt.clouddn.com/logo1.png' />
          </div>
          <Grid className="menu-bar">
            <Grid.Column textAlign="center" width={2}>
              <Link to="/" className="home-link">主页</Link>
            </Grid.Column>
            <Grid.Column textAlign="center" width={2}>
              <Link to="/mailmonitor" className="mailMonitor-link">邮件监管</Link>
            </Grid.Column>
            <Grid.Column textAlign="center" width={2}>
              <Link to="/extraction" className="mailMonitor-link">信息抽取</Link>
            </Grid.Column>
            <Grid.Column textAlign="center" width={2}>
              <Link to="/algomonitor" className="mailMonitor-link">算法管理</Link>
            </Grid.Column>
          </Grid>
          <Route exact path="/" component={HomePage} />
          <Route path='/mailmonitor' component={MailIndex} />
          <Route path='/algomonitor' component={Monitor} />
          <Route path='/extraction' component={Extraction} />
        </div>
      </Router>
    )
  }
}

export default App;
