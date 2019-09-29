import React from 'react';
import './index.less';
import { Layout, Menu } from 'antd';
import { withRouter } from 'umi';


const { Header } = Layout;

interface CustomHeaderProps {
  headerMenu?: any,
  dispatch?: any,
  history?: any
}

class CustomHeader extends React.Component<CustomHeaderProps, {
  headerMenus, defaultSelect
}> {

  constructor(props) {
    super(props);
    this.state = {
      headerMenus: ['首页', '笔记', '项目', '关于我'],
      defaultSelect: '0',
    };
  }


  componentDidMount() {
    let path = this.props.history.location.pathname;
    this.menuIndexSelect(path);
  }


  menuIndexSelect = (path) => {
    let index = '0';
    switch (path) {
      case '/':
        index = '0';
        break;
      case '/articles':
      case '/article':
        index = '1';
        break;
      case '/projects':
        index = '2';
        break;
      case '/mine':
        index = '3';
        break;
    }
    this.setState({
      defaultSelect: index,
    });
  };


  menuClick = (item) => {
    let path = '/';
    switch (item) {
      case '首页':
        path = '/';
        break;
      case '笔记':
        path = '/articles';
        break;
      case '项目':
        path = '/projects';
        break;
      case '关于我':
        path = '/mine';
        break;
    }
    this.menuIndexSelect(path);
    this.props.history.push(path);
  };


  randerMenus() {
    return <Menu mode="horizontal"
                 style={{ lineHeight: '62px', border: 'none', marginRight: '150px' }}
                 defaultSelectedKeys={['0']}
                 selectedKeys={[this.state.defaultSelect]}>
      {
        this.state.headerMenus.map((item, index) =>
          <Menu.Item key={index} onClick={e => this.menuClick(item)}>
            {item}
          </Menu.Item>)
      }
    </Menu>;
  }


  render() {
    return <Header className="app-header">
      {this.randerMenus()}
    </Header>;
  }
}

// @ts-ignore
export default withRouter(CustomHeader);
