import React from 'react';
import './index.less';
import { Layout } from 'antd';
import CustomHeader from '../components/CustomHeader';

const { Content } = Layout;

const BasicLayout: React.FC = props => {

  // @ts-ignore
  // if (props.location.pathname === '/article')
  //   return (<div>
  //     {props.children}
  //   </div>);


  return (
    <div className="normal">
      <Layout>
        <CustomHeader/>
        <Content className="app-content">
          {props.children}
        </Content>
      </Layout>
    </div>
  );
};

export default BasicLayout;
