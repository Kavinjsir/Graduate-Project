import React from 'react';
import { Button, List } from 'semantic-ui-react';

import WriteLetter from './writeLetter';

export default class LeftSideBar extends React.Component {

  state = { open: false }
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  update = () => this.props.onUpdate();

  getUnReadCount = () => {
    return this.props.emails.reduce(
      (previous, msg) => {
        if (msg.read !== 'true') return previous + 1;
        else return previous;
      }, 0);
  }

  getDeletedCount = () => {
    return this.props.emails.reduce(
      (previous, msg) => {
        if (msg.tag === 'deleted') return previous + 1;
        else return previous;
      }, 0);
  }

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
    const { open } = this.state
    return (
      <div className='sidebar'>
        <div className='header'>
          {/* <Button className='receive' fluid content='收信' icon='mail' basic inverted color='orange' />
          <Button className='write' fluid content='写信' icon='mail forward' basic inverted color='orange' /> */}
          <div className='receive' onClick={() => this.update()}>
            {/* 收信 */}
            过滤
          </div>
          {/* <div className='fengexian'>|</div>
          <div className='write' onClick={() => this.open()}>
            写信
          </div> */}
        </div>
        {/* <List animated > */}
        <List>

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

        </List>
        <WriteLetter open={open} onClose={this.close} />
      </div>
    );
  }
}