import React from 'react';
import { Input, Grid, Modal, Button } from 'semantic-ui-react';

export default class WriteLetter extends React.Component {
  addressInput;
  subjectInput;
  contentInput;

  close = () => this.props.onClose();

  handleSubmit = () => {
      console.log(this.addressInput, this.subjectInput, this.contentInput);
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