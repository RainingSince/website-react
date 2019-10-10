import React from 'react';
import { Avatar, Button, Card, List } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'umi';
import moment from 'moment';
import './index.less';

moment.locale('zh-cn');

const { Meta } = Card;

interface ProjectItem {
  name,
  imageCover,
  remark,
  author,
  createDate,
  updateDate
}


// @ts-ignore
@connect(({ projects, loading }) => ({
  projects: projects.projects,
  submitting: loading.effects['projects/loadProjects'],
}))
class ProjectPage extends React.Component<{ projects, submitting, dispatch, history }, { step, current }> {

  constructor(props) {
    super(props);

    this.state = {
      step: 10,
      current: 1,
    };
  }

  onLoadMore = () => {
    let current = this.state.current;
    current++;
    let params = { current: current, step: this.state.step };
    this.loadProjects(params);
    this.setState({ current: current });
  };

  renderList = () => {
    const isMore = this.props.projects.total > (this.state.current * this.state.step);
    const loadMore = isMore && !this.props.submitting ? (<div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={this.onLoadMore}>加载更多</Button>

    </div>) : null;
    const { projects } = this.props;

    return <List
      loadMore={loadMore}
      loading={this.props.submitting}
      grid={{ gutter: 16, column: 3 }}
      dataSource={projects.records}
      renderItem={(item: ProjectItem) => (
        <List.Item
          className='app-item'
          onClick={e => this.toDetail(item)}
        >
          <Card
            bordered={false}
            cover={
              <img
                style={{ height: 250 }}
                src={item.imageCover}
              />
            }
          >
            <Meta
              title={item.name}
              description={item.remark}
            />
            <div className="pj-item-hint">
              <div>{moment(item.updateDate, 'yyyy-mm-dd').fromNow()}</div>
              <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{item.author[0]}</Avatar>
            </div>
          </Card>
        </List.Item>
      )}
    />;
  };


  componentDidMount() {
    this.loadProjects(null);
  }


  loadProjects = (params) => {
    this.props.dispatch({
      type: 'projects/loadProjects',
      playload: params,
    });
  };

  toDetail = (item) => {
    this.props.history.push({
      pathname: '/article',
      query: { id: item.id, type: '2' },
    });
  };

  render() {
    return <div className="pg-container">

      <div className="pg-content" style={{ marginTop: '15px' }}>

        {this.renderList()}

      </div>

    </div>;
  }

}

// @ts-ignore
export default withRouter(ProjectPage);
