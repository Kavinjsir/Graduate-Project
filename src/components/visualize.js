import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class Chart extends Component {
  getOption = () => {
    let category = [];
    let dottedBase = +new Date();
    let lineData = [];
    let barData = [];
    
    for (let i = 0; i < 20; ++i) {
      let date = new Date(dottedBase += 1000 * 3600 * 24);
      category.push([
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      ].join('-'));
      let b = Math.random() * 200;
      let d = Math.random() * 200;
      barData.push(b);
      lineData.push(d + b);
    }

    let option = {
      backgroundColor: '#0f375f',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true,
            backgroundColor: '#333'
          }
        }
      },
      legend: {
        data: ['line', 'bar'],
        textStyle: {
          color: '#ccc'
        }
      },
      xAxis: {
        data: category,
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      yAxis: {
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      series: [{
        name: 'line',
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 15,
        data: lineData
      }, {
        name: 'bar',
        type: 'bar',
        barWidth: 10,

        data: barData
      }, {
        name: 'line',
        type: 'bar',
        barGap: '-100%',
        barWidth: 10,
        z: -12,
        data: lineData
      }, {
        name: 'dotted',
        type: 'pictorialBar',
        symbol: 'rect',
        itemStyle: {
          normal: {
            color: '#0f375f'
          }
        },
        symbolRepeat: true,
        symbolSize: [12, 4],
        symbolMargin: 1,
        z: -10,
        data: lineData
      }]
    };
    return option;
}

  render() {
    return (
        <ReactEcharts
          option={this.getOption()}
          style={{height: '350px', width: '100%'}}  
          className='react_for_echarts'
        />
    );
  }
}

export default Chart;
