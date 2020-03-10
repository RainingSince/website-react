import React from 'react';
import './index.less';
import { Layout } from 'antd';
import CustomHeader from '../components/CustomHeader';
import CustomTel from '@/components/CustomTel';
import { getContext } from '@/utils/contextUtils';

const { Content } = Layout;

const BasicLayout: React.FC = props => {

  // @ts-ignore
  // if (props.location.pathname === '/article')
  //   return (<div>
  //     {props.children}
  //   </div>);

  const isPhone = getContext();

  return (
    <div className="normal">
      {isPhone ? '' : <CustomTel/>}
      <Layout>
        <CustomHeader/>
        <Content className={isPhone ? 'app-content-phone' : 'app-content'}>
          {props.children}
        </Content>
      </Layout>
    </div>
  );
};

export default BasicLayout;
