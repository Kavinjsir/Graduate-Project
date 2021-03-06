import React from 'react';
import { Button, List, Divider, Grid, Popup, Header, Input, Message } from 'semantic-ui-react';
import request from 'superagent';

export default class LeftSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      algo: ''
    };
  }

  componentWillMount() {
    request
      .get('http://202.120.40.69:12347/manage/status')
      .then(res => {
        const { email_calling } = res.body;
        this.setState({ algo: email_calling });
      })
  }

  update = () => this.props.onUpdate();

  // Counting mails from different type
  getInboxCount = () => {
    return this.props.emails.reduce(
      (previous, msg) => {
        if (msg.tag === 'inbox') return previous + 1;
        else return previous;
      }, 0);
  }

  getSpamCount = () => {
    return this.props.emails.reduce(
      (previous, msg) => {
        if (msg.tag === 'spam') return previous + 1;
        else return previous;
      }, 0);
  }

  getSensitiveCount = () => {
    return this.props.emails.reduce(
      (previous, msg) => {
        if (msg.tag === 'sensitive') return previous + 1;
        else return previous;
      }, 0);
  }

  getSecretCount = () => {
    return this.props.emails.reduce(
      (previous, msg) => {
        if (msg.tag === 'secret') return previous + 1;
        else return previous;
      }, 0);
  }

  render() {
    return (
      <div className='sidebar'>
        <List>
        <Message attached='top' positive size='mini' content={'执行算法:' + this.state.algo} />
          <List.Item onClick={() => this.update()}>
            <List.Content>
              <Button color='teal' fluid  size='medium' content='过滤'  basic />
            </List.Content>
          </List.Item>

          <List.Item onClick={() => this.props.onListUpdate()}>
            <List.Content>
              <Button circular fluid  size='medium' content='刷新邮件列表'  basic />
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content>
              <Divider />
            </List.Content>
          </List.Item>

          <List.Item onClick={() => { this.props.setSidebarSection('inbox'); }}>
            <List.Content>
              <Button circular fluid size='medium' content='正常' icon='mail outline' basic label={this.getInboxCount() > 0 ? this.getInboxCount() : null} />
            </List.Content>
          </List.Item>

          <List.Item onClick={() => { this.props.setSidebarSection('spam'); }}>
            <List.Content>
              <Button circular fluid size='medium' content='垃圾' icon='remove' basic label={this.getSpamCount() > 0 ? this.getSpamCount() : null} />
            </List.Content>
          </List.Item>

          <List.Item onClick={() => { this.props.setSidebarSection('secret'); }}>
            <List.Content>
              <Button circular fluid size='medium' content='涉密' icon='protect' basic label={this.getSecretCount() > 0 ? this.getSecretCount() : null } />
            </List.Content>
          </List.Item>

          <List.Item onClick={() => { this.props.setSidebarSection('sensitive'); }}>
            <List.Content>
              <Button circular fluid size='medium' content='敏感' icon='hide' basic label={this.getSensitiveCount() > 0 ? this.getSensitiveCount() : null} />
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content>
              <Divider />
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content>
              <Popup
                trigger={<Button circular fluid size='medium' content='登入' basic />}
                flowing
                hoverable
                on='click'
              >
                <Grid centered >
                  <Grid.Row>
                    <Header as='h4'>帐号</Header>
                    <Input type='email' onChange={(_, d) => this.user = d.value} />
                  </Grid.Row>
                  <Grid.Row>
                    <Header as='h4'>密码</Header>
                    <Input type='password' onChange={(_, d) => this.pwd = d.value} />
                  </Grid.Row>
                  <Grid.Row>
                    <Header as='h4'>Host</Header>
                    <Input type='url' onChange={(_, d) => this.host = d.value} />
                  </Grid.Row>
                  <Button circular basic content='确认' onClick={() => this.props.onLogIn(this.user, this.pwd, this.host)} />
                </Grid>
              </Popup>
            </List.Content>
          </List.Item>

          <List.Item onClick={() => this.props.onLogOut()}>
            <List.Content>
              <Button circular fluid size='medium' content='登出'  basic />
            </List.Content>
          </List.Item>

        </List>
      </div>
    );
  }
}