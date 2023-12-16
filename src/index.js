import React, { useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { registerMicroApps, start } from 'qiankun';
import "./styles/index.less";
import { BrowserRouter as Router } from 'react-router-dom';
import { Menu } from 'antd';

import config from '../public/config'
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = config[process.env.NODE_ENV].microApps.map(item => {
  return getItem(item.name, item.activeRule, null)
})

// const MICRO_APPS = eval('<%= JSON.stringify(htmlWebpackPlugin.options.config.microApps) %>')
// console.log('====================================');
// console.log(MICRO_APPS);
// console.log('====================================');
const microApps = config[process.env.NODE_ENV].microApps.map(item => {
  return {
    ...item,
    container: '#container',  // 类似于一个容器，起到占位的作用
  }
})
console.log('====================================');
console.log(microApps);
console.log('====================================');
function FunctionComponent() {
  // const location = useLocation()

  registerMicroApps(microApps);
  useEffect(start, [])
  
  const MenuNavdgate = () => {
    const onClick = (e) => {
      window.location.href = `${window.location.origin}${e.key}`
    };
    return (
      <nav className="nav">
        <Menu
          onClick={onClick}
          style={{
            width: 200,
            height: '100%'
          }}
          defaultSelectedKeys={[window.location.pathname]}
          defaultOpenKeys={[window.location.pathname]}
          mode="inline"
          items={items}
        />
      </nav>
    );
  };
  return (
    <Router basename="webpack">
      <div className="box">
        {/* 左边菜单 */}
        <MenuNavdgate />
        {/* 右边路由内容 */}
        <div style={{ flex: 1, padding: '20px' }}>

          <div id='container' />
        </div>
      </div>
    </Router>
  );
}

const jsx = (
  <div className="border">
    <FunctionComponent name="FunctionComponent" />
  </div>
);

export default createRoot(document.getElementById('root')).render(jsx);