import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import RegisterOps from './registerOps';

export default class RegisterComp extends React.Component {

  render() {
    return (
      <Grid centered columns='equal'>
        <Grid.Column width={6}>
          <List>
            <List.Header content='可注册算法' />
            {
              this.props.negList.map(algo => {
                return (
                  <RegisterOps al={algo} onUpdate={this.props.onUpdate} />
                );
              })
            }
          </List>
        </Grid.Column>
        <Grid.Column width={6}>
          <List>
            <List.Header content='已注册算法' />
            {
              this.props.posList.map(algo => {
                return (
                  <RegisterOps al={algo} onUpdate={this.props.onUpdate} />
                );
              })
            }
          </List>
        </Grid.Column>
      </Grid>
    );
  }
}