import React, { useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { registerMicroApps, start } from 'qiankun';
import "./styles/index.less";
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
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


const microApps = config[process.env.NODE_ENV].microApps.map(item => {
  return {
    ...item,
    container: '#container',  // 类似于一个容器，起到占位的作用
  }
})
function FunctionComponent() {
  // const location = useLocation()
  const [activeNav, setActiveAnv] = useState(window.location.pathname)

  registerMicroApps(microApps);
  useEffect(() => {
    start()
    setActiveAnv(window.location.pathname)
  }, [])
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
          defaultSelectedKeys={[activeNav]}
          defaultOpenKeys={[activeNav]}
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