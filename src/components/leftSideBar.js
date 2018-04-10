import React from 'react';
import { Button, List, Divider } from 'semantic-ui-react';

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
          <Button circular size='mini' content='收信' icon='mail' fluid basic inverted color='orange' />
          <Button circular size='mini' content='写信' icon='mail forward' fluid basic inverted color='orange' />
        </div>
        <Divider fitted />
        <List animated verticalAlign='middle'>
          <List.Item onClick={() => { this.props.setSidebarSection('inbox'); }}>
            <List.Content>
              <Button size='medium' content='收件箱' icon='mail outline' basic inverted label={this.getUnReadCount() ? { size: 'mini', basic: 'true', content: this.getUnReadCount() ? this.getUnReadCount() : null } : null} />
              {/* <Icon name='mail outline' />
              收件箱
              <Label size='mini' color='black'>{this.getUnReadCount() ? this.getUnReadCount() : null}</Label> */}
            </List.Content>
          </List.Item>
          <Divider fitted />
          <List.Item onClick={() => { this.props.setSidebarSection('sent'); }}>
            <List.Content>
              <Button size='medium' content='发件箱' icon='send' basic inverted />
              {/* <Icon name='send' />
              发件箱 */}
              {/* <Label size='mini' color='orange'>0</Label> */}
            </List.Content>
          </List.Item>
          <Divider fitted />
          <List.Item onClick={() => { this.props.setSidebarSection('deleted'); }}>
            <List.Content>
              <Button size='medium' content='已删除' icon='trash' basic inverted />
              {/* <Icon name='trash' />
              已删除 */}
              {/* <Label size='mini' color='orange'>{this.getDeletedCount()}</Label> */}
            </List.Content>
          </List.Item>
          <Divider fitted />
          <List.Item onClick={() => { this.props.setSidebarSection('spam'); }}>
            <List.Content>
              <Button size='medium' content='垃圾邮件' icon='remove' basic inverted />
              {/* <Icon name='remove' />
              垃圾邮件 */}
              {/* <Label size='mini' color='orange'>0</Label> */}
            </List.Content>
          </List.Item>
          <Divider fitted />
          <List.Item onClick={() => { this.props.setSidebarSection('secret'); }}>
            <List.Content>
              <Button size='medium' content='涉密邮件' icon='protect' basic inverted />
              {/* <Icon name='protect' />
              涉密邮件 */}
              {/* <Label size='mini' color='orange'>0</Label> */}
            </List.Content>
          </List.Item>
          <Divider fitted />
          <List.Item onClick={() => { this.props.setSidebarSection('sensitive'); }}>
            <List.Content>
              <Button size='medium' content='敏感邮件' icon='hide' basic inverted />
              {/* <Icon name='hide' />
              敏感邮件 */}
              {/* <Label size='mini' color='orange'>0</Label> */}
            </List.Content>
          </List.Item>
          <Divider fitted />
        </List>
      </div>
    );
  }
}