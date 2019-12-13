import React from 'react';
import './index.less';
import { Layout } from 'antd';
import CustomHeader from '../components/CustomHeader';
import CustomTel from '@/components/CustomTel';

const { Content } = Layout;

const BasicLayout: React.FC = props => {

  // @ts-ignore
  // if (props.location.pathname === '/article')
  //   return (<div>
  //     {props.children}
  //   </div>);


  return (
    <div className="normal">
      <CustomTel/>
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
