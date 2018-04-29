import React from 'react';
import { Segment } from 'semantic-ui-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class Result extends React.Component {
  render() {
    if (this.props.res == null) return null;
    return (
      <Segment size='massive' textAlign='center'>
        <BarChart width={1400} height={500} data={this.props.res} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="size" fill="#8884d8" />
        </BarChart>
      </Segment>
    );
  }
}