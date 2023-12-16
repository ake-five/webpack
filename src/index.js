import React, { useReducer, useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { registerMicroApps, start } from 'qiankun';
import "./styles/index.less";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('react-manage', '/react-manage', null),
];

const MenuNavdgate = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    // console.log(e, location)
    navigate(e.key)
  };
  return (
    <nav className="nav">
      <Menu
        onClick={onClick}
        style={{
          width: 200,
          height: '100%'
        }}
        defaultSelectedKeys={['/react-manage']}
        defaultOpenKeys={['/react-manage']}
        mode="inline"
        items={items}
      />
    </nav>
  );
};

function FunctionComponent(props) {
  // const location = useLocation()

  registerMicroApps([
    {
      name: 'react app', // app已经注册的名字
      entry: '//localhost:2023',  // 进入的主机端口号
      container: '#container',  // 类似于一个容器，起到占位的作用
      activeRule: '/react-manage',  // 找到微应用的路径
    },
  ]);
  useEffect(start, [])

  return (
    <Router basename="webpack">
      <div className="box">
        {/* 左边菜单 */}
        <MenuNavdgate />
        {/* 右边路由内容 */}
        <div style={{ flex: 1, padding: '20px' }}>

          <Routes>
            {/* <Route path="/" element={<Navigate to="/react-manage" />} /> */}
            <Route path="/react-manage" element={<div id="container" />} />
          </Routes>
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