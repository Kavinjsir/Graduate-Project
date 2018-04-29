import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import TransferOps from './transferOps';

export default class RegisterComp extends React.Component {

  render() {
    return (
      <Grid centered>
        <Grid.Column width={8}>
          <List>
            <List.Header content='可调用算法' />
            {
              this.props.algoList.map(algo => {
                return (
                  <TransferOps currentAlgo={this.props.currentAlgo} al={algo} onUpdate={this.props.onUpdate} />
                );
              })
            }
          </List>
        </Grid.Column>
      </Grid>
    );
  }
}