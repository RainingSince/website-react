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
      headerMenus: ['笔记', '项目'],
      defaultSelect: '0',
    };
  }


  componentDidMount() {
    let path = this.props.history.location.pathname;
    let query = this.props.history.location.query;
    this.menuIndexSelect(path, query);
  }


  menuIndexSelect = (path, query) => {
    let index = '0';
    if (path.indexOf('/projects') > -1) index = '1';
    else if (path.indexOf('/mine') > -1) index = '2';
    else if (path.indexOf('/article') > -1 && query.type == '2') index = '1';
    else if (path.indexOf('/article') > -1 && query.type == '1') index = '0';
    else index = '0';

    this.setState({
      defaultSelect: index,
    });
  };


  menuClick = (item) => {
    let path = '/';
    let type = '0';
    switch (item) {
      case '笔记':
        path = '/';
        break;
      case '项目':
        path = '/projects';
        break;
      case '关于我':
        path = '/mine';
        break;
    }
    this.menuIndexSelect(path, type);
    this.props.history.push(path);
  };


  randerMenus() {
    return <Menu mode="horizontal"
                 style={{ width: '1200px', textAlign: 'end', lineHeight: '62px', border: 'none', marginRight: '30px' }}
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
