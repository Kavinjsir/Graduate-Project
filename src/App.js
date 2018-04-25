import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import { fetchList, setRead, setDelete } from './reduce/action';
import LeftSideBar from './components/leftSideBar';
import EmailList from './components/emailList';
import EmailDetails from './components/emailDetails';
// import Chart from './components/visualize';
// import './App.css';
import './Unify.css';

require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEmailId: 0,
      currentSection: 'inbox',
    };
  }

  async componentWillMount() {
    const response = await fetch('http://127.0.0.1:5555/inbox');
    const result = await response.json();
    this.props.dispatch(fetchList(result));
  }

  updateInbox = async () => {
    const response = await fetch('http://127.0.0.1:5555/inbox');
    const result = await response.json();
    this.props.dispatch(fetchList(result));
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

  render() {
    const currentEmail = this.props.emails.find(x => x.id === this.state.selectedEmailId);
    return (
      <div>
        <div className='title'>
          {/* <img alt='xiaohui' src='http://vi.sjtu.edu.cn/img/base/Logo.png' /> */}
          <img alt='logo' src='http://oyy735z2r.bkt.clouddn.com/logo1.png' />
          {/* <div className='proname'>邮件监管系统</div> */}
          {/* <div className='logout'>登出</div> */}
        </div>
        <div className='grid'>
          <Grid>
            <Grid.Column width={3}>
              <LeftSideBar
                activeSection={this.state.currentSection}
                emails={this.props.emails}
                setSidebarSection={section => this.setSidebarSection(section)}
                onUpdate={this.updateInbox}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <EmailList
                emails={this.props.emails.filter(x => x.tag === this.state.currentSection)}
                onEmailSelected={id => this.openEmail(id)}
                selectedEmailId={this.state.selectedEmailId}
                currentSection={this.state.currentSection}
              />
            </Grid.Column>
            <Grid.Column width={9}>
              <EmailDetails
                email={currentEmail}
                onDelete={id => this.deleteMessage(id)}
              />
            </Grid.Column>
          </Grid>
        </div>
      </div>
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
