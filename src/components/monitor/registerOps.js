import React from 'react';
import { List, Button } from 'semantic-ui-react';

export default class RegisterOps extends React.Component {
  render() {
    return (
      <List.Item>
        <List.Content>
          <List.Header>{this.props.al.name}</List.Header>
          <List.Description>
            <Button
              circular
              size='mini'
              content={this.props.al.status === '0' ? '点击注册' : '点击撤回'}
              icon='mail outline'
              basic
              onClick={() => this.props.onUpdate(this.props.al.id)}
            />
          </List.Description>
        </List.Content>
      </List.Item>
    );
  }
}