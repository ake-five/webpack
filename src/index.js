import React, { useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { registerMicroApps, start } from 'qiankun';
import "./styles/index.less";
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout, Menu, theme, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
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
const DropdownItems = [
  getItem('退出 登陆', 'loginout', null)
];

const microApps = config[process.env.NODE_ENV].microApps.map(item => {
  return {
    ...item,
    container: '#container',  // 类似于一个容器，起到占位的作用
  }
})
function getCookie(name) {
  var cookies = document.cookie.split("; ");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return cookie[1];
    }
  }
  return null;
}
start()
function DeleteCookie(name) {
  debugger
  var date = new Date();
  date.setTime(date.getTime() - 10000); //删除一个cookie，就是将其过期时间设定为一个过去的时间
  document.cookie = name + "=删除" + "; expires=" + date.toUTCString();
  //document.cookie = " " + name + "=删除" + "; expires=" + date.toGMTString();
}
function FunctionComponent() {
  // const location = useLocation()

  registerMicroApps(microApps);
  useEffect(() => {
    // start()

    if (!getCookie('ther')) {
      const envLoginDomainDev = '//ake-five.github.io'
      const returnURl = window.location.href
      window.location.href = `${envLoginDomainDev}/login-vite-vue/?returnUrl=${returnURl}`//本地调试登陆地址
    }
  }, [])
  const handleMenuClick = (e) => {
    window.location.href = `${window.location.origin}${e.key}`
  };
  const loginout = () => {
    DeleteCookie('ther')
  }
  const handleDropdownClick = (e) => {

    const events = {
      loginout
    }
    events[e.key] && events[e.key]()
  };
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
      <Layout style={{
        height: '100%',
      }}>
        {/* 左边菜单 */}
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '170px', height: '50px', color: '#fff', background: '#4078f2', borderRadius: '8px', marginRight: '16px',
            }}>
              应用集成平台
            </div>
            <Dropdown
              menu={{
                items,
                onClick: handleMenuClick
              }}
            >
              <div>
                <Space onClick={(e) => e.preventDefault()} style={{ color: "#fff" }}>
                  MicroApps
                  <DownOutlined />
                </Space>
              </div>
            </Dropdown>
          </div>
          <Dropdown
            menu={{
              items: DropdownItems,
              onClick: handleDropdownClick

            }}
          >
            <div>
              <Space onClick={(e) => e.preventDefault()} style={{ color: "#fff" }}>
                用户名
                <DownOutlined />
              </Space>
            </div>
          </Dropdown>
        </Header>
        {/* 右边路由内容 */}
        <Layout>
          {/* <Sider >
            <MenuNavdgate />
          </Sider> */}
          <Layout
            style={{
              height: '100%',
            }}
          >
            {/* <div id='container' /> */}
            <Content
              style={{
                margin: 0,
                padding: '16px',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <div id='container' style={{ height: '100%' }} />
            </Content>
          </Layout>
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