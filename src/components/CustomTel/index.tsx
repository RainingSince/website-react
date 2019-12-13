import * as React from 'react';
import { Icon, Popover } from 'antd';


export default class CustomTel extends React.Component<{}, { visible }> {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }


  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  render() {
    return <div style={{
      position: 'fixed',
      bottom: '50px',
      right: '50px',
      zIndex: 1999,
      fontSize: '30px',
    }}>
      <Popover
        content={(<div onClick={e => this.setState({ visible: false })}>QQ: 12565279</div>)}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <Icon type="qq" style={this.state.visible ? { color: '#1890ff' } : {}}/>
      </Popover>
    </div>;
  }

}
