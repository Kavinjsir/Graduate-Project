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

  render() {
    const { open } = this.state
    return (
      <div className='sidebar'>
        <div className='header'>
          {/* <Button className='receive' fluid content='收信' icon='mail' basic inverted color='orange' />
          <Button className='write' fluid content='写信' icon='mail forward' basic inverted color='orange' /> */}
          <div className='receive' onClick={() => this.update()}>
            收信
          </div>
          <div className='fengexian'>|</div>
          <div className='write' onClick={() => this.open()}>
            写信
          </div>
        </div>
        {/* <List animated > */}
        <List>
          <List.Item onClick={() => { this.props.setSidebarSection('inbox'); }}>
            <List.Content>
              <Button circular fluid size='medium' content='收件箱' icon='mail outline' basic label={this.getUnReadCount() ? this.getUnReadCount() : null} />
            </List.Content>
          </List.Item>
          <List.Item onClick={() => { this.props.setSidebarSection('sent'); }}>
            <List.Content>
              <Button circular fluid size='medium' content='发件箱' icon='send' basic />
            </List.Content>
          </List.Item>
          <List.Item onClick={() => { this.props.setSidebarSection('deleted'); }}>
            <List.Content>
              <Button circular fluid size='medium' content='已删除' icon='trash' basic />
            </List.Content>
          </List.Item>
          <List.Item onClick={() => { this.props.setSidebarSection('spam'); }}>
            <List.Content>
              <Button circular fluid size='medium' content='垃圾邮件' icon='remove' basic />
            </List.Content>
          </List.Item>
          <List.Item onClick={() => { this.props.setSidebarSection('secret'); }}>
            <List.Content>
              <Button circular fluid size='medium' content='涉密邮件' icon='protect' basic />
            </List.Content>
          </List.Item>
          <List.Item onClick={() => { this.props.setSidebarSection('sensitive'); }}>
            <List.Content>
              <Button circular fluid size='medium' content='敏感邮件' icon='hide' basic />
            </List.Content>
          </List.Item>
        </List>
        <WriteLetter open={open} onClose={this.close} />
      </div>
    );
  }
}