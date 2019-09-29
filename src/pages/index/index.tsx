import React from 'react';
import CustomRecommed from '@/components/CustomRecommed';
import { Row } from 'antd';

class HomePage extends React.Component {


  render() {
    return <div className='pg-container'>

      <div className='pg-content' style={{ marginTop: '15px' }}>


        <Row type='flex' justify='space-between'>

        </Row>


      </div>

      <CustomRecommed title='全部标签'>
        <div>123</div>
      </CustomRecommed>


    </div>;
  }

}

export default HomePage;
