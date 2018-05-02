import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

export default class Result extends React.Component {
  render() {
    if (this.props.res == null) return null;
    const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", "#008080"];
    return (
      <BarChart
        barCategoryGap='40%'
        width={600}
        height={570}
        data={this.props.res}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid />
        <XAxis dataKey="type" name='检索信息' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="size" name="抽取指数" stackId="a">
          {
            this.props.res.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))
          }
        </Bar>
        {/* <Bar dataKey="content" barSize={0} maxBarSize={0} stackId="a" fill="#82ca9d" />
        <Bar dataKey="type" maxBarSize={0} stackId="a" fill="#ffc658" /> */}
      </BarChart>
    );
  }
}