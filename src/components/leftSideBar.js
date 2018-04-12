import React from 'react';
import { Button, List } from 'semantic-ui-react';

export default class LeftSideBar extends React.Component {
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
    return (
      <div className='sidebar'>
        <div className='header'>
          {/* <Button circular size='mini' content='收信' icon='mail' basic inverted color='orange' />
          <Button circular size='mini' content='写信' icon='mail forward' basic inverted color='orange' /> */}
          <div className='receive' onClick={() => alert('building...')}>
            收信
          </div>
          <div className='write' onClick={() => alert('building...')}>
            写信
          </div>
        </div>
        <List animated >
          <List.Item onClick={() => { this.props.setSidebarSection('inbox'); }}>
            <List.Content>
              <Button size='medium' content='收件箱' icon='mail outline' basic label={this.getUnReadCount() ? { size: 'mini', basic: 'true', content: this.getUnReadCount() ? this.getUnReadCount() : null } : null} />
            </List.Content>
          </List.Item>
          <List.Item onClick={() => { this.props.setSidebarSection('sent'); }}>
            <List.Content>
              <Button size='medium' content='发件箱' icon='send' basic  />
            </List.Content>
          </List.Item>
          <List.Item onClick={() => { this.props.setSidebarSection('deleted'); }}>
            <List.Content>
              <Button size='medium' content='已删除' icon='trash' basic />
            </List.Content>
          </List.Item>
          <List.Item onClick={() => { this.props.setSidebarSection('spam'); }}>
            <List.Content>
              <Button size='medium' content='垃圾邮件' icon='remove' basic />
            </List.Content>
          </List.Item>
          <List.Item onClick={() => { this.props.setSidebarSection('secret'); }}>
            <List.Content>
              <Button size='medium' content='涉密邮件' icon='protect' basic />
            </List.Content>
          </List.Item>
          <List.Item onClick={() => { this.props.setSidebarSection('sensitive'); }}>
            <List.Content>
              <Button size='medium' content='敏感邮件' icon='hide' basic />
            </List.Content>
          </List.Item>
        </List>
      </div>
    );
  }
}