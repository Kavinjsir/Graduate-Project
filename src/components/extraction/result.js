import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class Result extends React.Component {
  render() {
    if (this.props.res == null) return null;
    return (
      <BarChart barCategoryGap='40%' width={600} height={570} data={this.props.res} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="size" stackId="a" fill="#FF8500" />
        {/* <Bar dataKey="content" barSize={0} maxBarSize={0} stackId="a" fill="#82ca9d" />
        <Bar dataKey="type" maxBarSize={0} stackId="a" fill="#ffc658" /> */}
      </BarChart>
    );
  }
}