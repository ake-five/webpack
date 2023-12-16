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
  getItem('微应用1', '/reactdome1', null),
  getItem('微应用2', '/react-ts-manage', null),
];


const microApps = [
  {
    name: '微应用dome1', // app已经注册的名字
    entry: '//ake-five.github.io/react-manage',  // 进入的主机端口号
    activeRule: '/webpack/reactdome1',  // 找到微应用的路径
  },
  {
    name: '微应用dome2', // app已经注册的名字
    entry: '//localhost:3001',  // 进入的主机端口号
    activeRule: '/webpack/react-ts-manage',  // 找到微应用的路径
  },
].map(item => {
  return {
    ...item,
    container: '#container',  // 类似于一个容器，起到占位的作用
  }
})
function FunctionComponent(props) {
  // const location = useLocation()
  const [activeNav, setActiveAnv] = useState('/reactdome1')
  registerMicroApps(microApps);
  useEffect(() => {
    start()
    setActiveAnv(window.location.pathname.replace('/webpack', ''))
  }, [])
  const MenuNavdgate = () => {
    const onClick = (e) => {
      window.location.href = `${window.location.origin}/webpack${e.key}`

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

          <Routes>
            {/* <Route path="/" element={<Navigate to="/react-ts-manage" />} /> */}
            <Route path={activeNav} element={<div id='container' />} />
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