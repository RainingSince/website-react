import React from 'react';
import './index.less';

class CustomRecommed extends React.Component<{ title, width?: string }, {}> {


  render() {

    const { width } = this.props;

    return <div className='cr-recommed' style={{ width: width ? width : '300px' }}>

      <div className='cr-recommed-title'>
        {this.props.title}
      </div>

      <div className='cr-recommed-conetent'>
        {this.props.children}
      </div>

    </div>;
  }
}

export default CustomRecommed;


