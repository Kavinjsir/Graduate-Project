import React from 'react';
import { Card } from 'semantic-ui-react';

export default class Info extends React.Component {
  render() {
      return (
      <Card.Group items={this.props.items} />
    )
  }
}