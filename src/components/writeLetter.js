import React from 'react';
import { Input, Grid, Modal, Button } from 'semantic-ui-react';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class WriteLetter extends React.Component {
  addressInput;
  subjectInput;
  contentInput;

  close = () => this.props.onClose();

  handleSubmit = async () => {
    console.log(typeof this.contentInput, this.addressInput, this.subjectInput, this.contentInput);

    try {
      const response = await fetch('http://localhost:5555/sent', {
        method: 'POST',
        body: JSON.stringify({
          subject: this.subjectInput,
          text: this.contentInput,
        }),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (

      <Modal basic open={this.props.open} onClose={this.close}>
        <br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br />
        <Modal.Header>Writing...</Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Input label='Mail to:' type='email' onChange={(_, d) => this.addressInput = d.value} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Input label='Subject:' onChange={(_, d) => this.subjectInput = d.value} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Input label='Content:' onChange={(_, d) => this.contentInput = d.value} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleSubmit}>发送</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}