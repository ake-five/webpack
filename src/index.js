import React, { useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { registerMicroApps, start } from 'qiankun';
import "./styles/index.less";
import { BrowserRouter as Router } from 'react-router-dom';
import {  Layout, Menu, theme } from 'antd';

const { Header, Content, Sider } = Layout;
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
          theme="dark"
          mode="horizontal"
          items={items}
        />
      </nav>
    );
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Router basename="webpack">
       <Layout  style={{
            height: '100%',
          }}>
        {/* 左边菜单 */}
        <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <MenuNavdgate />
        </Header>
        {/* 右边路由内容 */}
        <Layout
          style={{
            height: '100%',
          }}
        >
          {/* <div id='container' /> */}
          <Content
            style={{
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
           <div id='container' style={{height:'100%'}}/>
          </Content>
          </Layout>
          </Layout>

    </Router>
  );
}

const jsx = (
  <div className="border">
    <FunctionComponent name="FunctionComponent" />
  </div>
);

export default createRoot(document.getElementById('root')).render(jsx);