import React from 'react';
import { Link } from 'react-router-dom';


export default class HomePage extends React.Component {
  render() {
    return (
      <div className='home-page'>
        <div className="home-page-display" >
        <h1 className="home-page-title">
          文本挖掘系统
        </h1>
        <Link to='/mailmonitor' key='mailmonitor'>邮件监管</Link>
        <Link to='/extraction' key='extraction'>信息抽取</Link>
        <Link to='/administration' key='administration'>算法管理</Link>
        </div>
      </div>
    );
  }
}
