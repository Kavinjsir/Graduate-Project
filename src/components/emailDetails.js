import React from 'react';
import { Segment, Button, Header, Divider, Message } from 'semantic-ui-react';
import { getPrettyDate, getPrettyTime } from '../utils/date';

export default class EmailDetails extends React.Component {

  getDeleteButton = () => {
    if (this.props.email.tag !== 'deleted') {
      return (
        <Button inverted color='orange' onClick={() => this.props.onDelete(this.props.email.id)}>
          Delete
        </Button>
      );
    }
    return undefined;
  }

  render() {
    if (!this.props.email) {
      return (
        <div>
          Please select a mail.
        </div>
      );
    }

    const date = `${getPrettyDate(this.props.email.time)} · ${getPrettyTime(this.props.email.time)}`;

    return (
      <div className='maildetail'>
      <Segment>
        <Header textAlign='left'>
          <Header.Content>
            <strong>
              {this.props.email.subject}
            </strong>
            <Divider fitted />
            <Header.Subheader>
              发件人：{this.props.email.from}
              <br />
              时间：{date}
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Message>
          {this.props.email.message}
        </Message>
      </Segment>
      </div>
    );
  }

}