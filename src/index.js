import React, { useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { registerMicroApps, start } from 'qiankun';
import "./styles/index.less";
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout, Menu, theme, Dropdown, Space, Button, Drawer } from 'antd';
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

function clearAllCookie() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
}

function FunctionComponent() {
  // const location = useLocation()

  registerMicroApps(microApps);
  useEffect(() => {
    // start()

    if (!getCookie('ther')) {
      const envLoginDomainDev = '//ake-five.github.io'
      const returnURl = window.location.href
      window.location.href = `${envLoginDomainDev}/login-vite-vue/?returnUrl=${encodeURIComponent(returnURl)}`//本地调试登陆地址
      return
    }
  }, [])
  const handleMenuClick = (e) => {
    window.location.href = `${window.location.origin}${e.key}`
  };
  const loginout = () => {
    clearAllCookie()

    const envLoginDomainDev = '//ake-five.github.io'
    const returnURl = window.location.href
    window.location.href = `${envLoginDomainDev}/login-vite-vue/?returnUrl=${encodeURIComponent(returnURl)}`//本地调试登陆地址
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
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
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
            {/* <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '170px', height: '50px', color: '#fff', background: '#4078f2', borderRadius: '8px', marginRight: '16px',
            }}>
              应用集成平台
            </div> */}
            <Dropdown
              menu={{
                items,
                onClick: handleMenuClick
              }}
            >
              <div>
                <Space onClick={(e) => e.preventDefault()} style={{ color: "#fff", cursor: 'pointer' }}>
                  MicroApps
                  <DownOutlined />
                </Space>
              </div>
            </Dropdown>
            <Button style={{ marginLeft: '16px' }} type="primary" onClick={showDrawer}>
              添加微应用配置
            </Button>
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
              {/* <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p> */}
            </Drawer>
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