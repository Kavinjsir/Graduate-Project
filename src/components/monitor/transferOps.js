import React from 'react';
import { List, Button } from 'semantic-ui-react';

export default class TransferOps extends React.Component {
  render() {
    return (
      <List.Item>
        <List.Content>
          <List.Header>{this.props.al.name}</List.Header>
          <List.Description>
            <Button
              circular
              size='mini'
              content='点击调用'
              icon='mail outline'
              basic
              color={this.props.currentAlgo === this.props.al.id ? 'orange' : null}
              onClick={() => this.props.onUpdate(this.props.al.id)}
            />
          </List.Description>
        </List.Content>
      </List.Item>
    );
  }
}