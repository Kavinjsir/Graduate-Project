import React from 'react';
import { Segment } from 'semantic-ui-react';
import EmailListItem from './emailListItem';

export default class EmailList extends React.Component {
  render() {
    if (!this.props.emails || this.props.emails.length === 0) {
      return (
        <Segment>
          <p>没有相关类型的邮件。</p>
        </Segment>
      );
    }

    return (
      <div>
        {this.props.emails.map(email => {
          return (
            <div className='maillist'>
            <Segment vertical >
              <EmailListItem
                onEmailClicked={id => this.props.onEmailSelected(id)}
                email={email}
                selected={this.props.selectedEmailId === email.id}
              />
            </Segment>
            </div>
          );
        })}
      </div>
    );
  }
}