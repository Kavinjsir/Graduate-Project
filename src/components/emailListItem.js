import React from 'react';
import { Item } from 'semantic-ui-react';
import { getPrettyDate } from '../utils/date';

export default class EmailListItem extends React.Component {
  render() {
    return (
      <div onClick={() => this.props.onEmailClicked(this.props.email.id)}>
        <div data-read={this.props.email.read} />
        <Item>
          <Item.Content>
            <Item.Header>
              <strong>
              {this.props.email.subject}
              </strong>
              </Item.Header>
            <Item.Meta>{this.props.email.from}</Item.Meta>
            <Item.Extra>{getPrettyDate(this.props.email.time)}</Item.Extra>
          </Item.Content>
        </Item>
      </div>
    );
  }
}