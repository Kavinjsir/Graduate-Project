import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import request from 'superagent';

import { fetchList, setRead, setDelete, updateList } from './reduce/action';
import LeftSideBar from './components/leftSideBar';
import EmailList from './components/emailList';
import EmailDetails from './components/emailDetails';
import HomePage from './components/home';
import Monitor from './components/monitor/index';
import './Unify.css';
import Extraction from './components/extraction';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEmailId: 0,
      currentSection: 'inbox',
      address: '',
    };
  }

  async componentWillMount() {
    request
      .get('http://127.0.0.1:5555/inbox')
      .then(res => {
        const result = res.body;
        this.props.dispatch(fetchList(result));
      });
    request
      .get('http://127.0.0.1:5555/account')
      .then(res => {
        const result = res.body;
        if (result === 'no account') { return; }
        this.setState({ address: result});
      })
  }

  updateInbox = async () => {
    const mailList = this.props.emails.filter(m => m.tag !== 'spam').map(m => { return { id: m.id.toString(), content: m.message } });
    console.log(mailList);
    alert('正在进行邮件分类......');
    request
      .post('http://202.120.40.69:12346/sendjson')
      .timeout({
        response: 20000,
        deadline: 30000
      })
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(mailList))
      .then(res => {
        const result = res.body;
        let newList = this.props.emails.concat();
        for (const r of result) {
          let idx = parseInt(r.id, 10);
          let obj = newList[idx];
          if (r.tag === '1') {
            obj.tag = 'inbox';
          } else if (r.tag === '0') {
            obj.tag = 'spam';
          } else if (r.tag === '2') {
            obj.tag = 'sensitive';
          } else if (r.tag === '3') {
            obj.tag = 'secret';
          }
          newList.splice(idx, 1, obj);
        }
        this.props.dispatch(updateList(newList));
        alert('分类完毕!');
      })
      .catch(error => {
        console.log('failed at:', error);
        alert('Sth. went wrong...');
      });
  }

  openEmail = id => {
    this.props.dispatch(setRead(id));
    this.setState({
      selectedEmailId: id
    });
  }

  deleteMessage = id => {
    this.props.dispatch(setDelete(id));
    let selectedEmailId = '';
    for (const email of this.state.currentSection) {
      if (email.tag === this.state.currentSection) {
        selectedEmailId = email.id;
        break;
      }
    }
    this.setState({ selectedEmailId });
  }

  setSidebarSection = section => {
    let selectedEmailId = section !== this.state.currentSection ? '' : this.state.selectedEmailId;
    this.setState({
      currentSection: section,
      selectedEmailId
    });
  }

  // Update Mail List on local server
  handleList = () => {
    request
    .get('http://127.0.0.1:5555/inbox')
    .then(res => {
      const result = res.body;
      this.props.dispatch(fetchList(result));
    })
    .catch(error => {
      console.log(error);
      alert('出现异常，无法获取邮件列表');
    })
  }

  // logIn
  handleLogIn = (user, pwd, receiveHost) => {
    if (user == null || pwd == null || receiveHost == null) {
      alert('无效的参数');
      return;
    }
    const parameter = {
      user,
      pwd,
      receiveHost,
      sendHost: 'invalid@invalid.com'
    };
    request
      .post('http://127.0.0.1:5555/login')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(parameter))
      .then( res => {
        console.log(res);
        if (res.text === 'Fetching...') {
          this.setState({ address: parameter.user});
          alert('正在抓取邮件列表......');
          return;
        }
        alert('登入过程出现错误');
      })
      .catch( error => {
        console.log(error);
        alert('登入过程出现错误');
      });
  }

  // logout
  handleLogOut = () => {
    if (this.state.address == null || this.state.address.length === 0) {
      alert('不在登陆状态');
      return;
    }
    const parameter = { address: this.state.address };
    request
      .delete('http://127.0.0.1:5555/logout')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(parameter))
      .then(res => {
        console.log(res);
        this.setState({ address: '' });
        alert('成功登出');
        this.props.dispatch(updateList([]));
      })
      .catch(error => {
        console.log(error);
        alert('登出过程出现错误');
      });
  }

  // Mail Monitor Component
  mailMonitorComponent = () => (
    <Grid className='mail-monitor'>
      <Grid.Column width={2}>
        <LeftSideBar
          activeSection={this.state.currentSection}
          emails={this.props.emails}
          setSidebarSection={section => this.setSidebarSection(section)}
          onUpdate={this.updateInbox}
          onLogIn={(u, p, h) => this.handleLogIn(u, p, h)}
          onLogOut={this.handleLogOut}
          onListUpdate={this.handleList}
        />
      </Grid.Column>
      <Grid.Column width={5}>
        <EmailList
          emails={this.props.emails.filter(x => x.tag === this.state.currentSection)}
          onEmailSelected={id => this.openEmail(id)}
          selectedEmailId={this.state.selectedEmailId}
          currentSection={this.state.currentSection}
        />
      </Grid.Column>
      <Grid.Column width={9}>
        <EmailDetails
          email={this.props.emails.find(x => x.id === this.state.selectedEmailId)}
          onDelete={id => this.deleteMessage(id)}
        />
      </Grid.Column>
    </Grid>
  );

  render() {
    return (
      <Router>
        <div>
          <div className='title'>
            {/* <img alt='xiaohui' src='http://vi.sjtu.edu.cn/img/base/Logo.png' /> */}
            <img alt='logo' src='http://oyy735z2r.bkt.clouddn.com/logo1.png' />
            <div>{this.state.address}</div>
            {/* <div className='proname'>邮件监管系统</div> */}
            {/* <div className='logout'>登出</div> */}
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
          <Route path='/mailmonitor' component={this.mailMonitorComponent} />
          <Route path='/algomonitor' component={Monitor} />
          <Route path='/extraction' component={Extraction} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    emails: state
  };
};

App = connect(mapStateToProps)(App);

export default App;
