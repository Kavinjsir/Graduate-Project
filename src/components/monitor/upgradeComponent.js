import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import UpgradeOps from './upgradeOps';

export default class UpgradeComp extends React.Component {
  render() {
    return (
      <Grid centered>
        <Grid.Column width={8}>
          <List>
            <List.Header content='可升级算法' />
            {
              this.props.algoList.map(algo => {
                return (
                  <UpgradeOps currentAlgo={this.props.currentAlgo} al={algo} onUpdate={this.props.onUpdate} />
                );
              })
            }
          </List>
        </Grid.Column>
      </Grid>
    );
  }
}