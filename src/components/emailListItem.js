import React from 'react';
import { Container } from 'semantic-ui-react';
import { getPrettyDate } from '../utils/date';

export default class EmailListItem extends React.Component {
  render() {
    return (
      <div className='listitem' onClick={() => this.props.onEmailClicked(this.props.email.id)}>
        <div data-read={this.props.email.read} />
        <Container fluid>
          <h4>{this.props.email.subject}</h4>
          <p>{this.props.email.from}</p>
          <p>{getPrettyDate(this.props.email.time)}</p>
        </Container>
      </div>
    );
  }
}