import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import { getPrettyDate } from '../utils/date';

export default class EmailListItem extends React.Component {
  render() {
    return (
      <div className='listitem' onClick={() => this.props.onEmailClicked(this.props.email.id)}>
        <div data-read={this.props.email.read} />
        <Button basic inverted color='orange' as={Container}>
          <div className='itemdetail'>
            <p className='detailtitle'>{this.props.email.subject}</p>
            <p>{this.props.email.from}  {getPrettyDate(this.props.email.time)}</p>
          </div>
        </Button>
      </div>
    );
  }
}