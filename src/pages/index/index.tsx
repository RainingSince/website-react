import React from 'react';
import './index.less';
import { List, Tag, Menu, Row, Button } from 'antd';
import { connect } from 'dva';
import { withRouter } from 'umi';
import CustomRecommed from '@/components/CustomRecommed';
import ArticleItem from '@/components/ArticleItem';


// @ts-ignore
@connect(({ headerMenu, tags, article, loading }) => ({
  tags: tags.tags,
  articles: article.articles,
  recentArticles: article.recentArticles,
  catalogs: headerMenu.menus,
  submitting: loading.effects['article/loadArticles'],
}))
class IndexPage extends React.PureComponent<{ dispatch, submitting, recentArticles, tags, articles, history, catalogs },
  { selectedCatalog, selectedTag, step, current, params }> {

  constructor(props) {
    super(props);

    this.state = {
      selectedCatalog: '',
      selectedTag: '',
      step: 10,
      current: 1,
      params: {},
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'headerMenu/loadHeaderMenus',
      playload: null,
    });

    this.props.dispatch({
      type: 'article/loadRencentArticles',
      playload: null,
    });
    this.loadArtiels(null);
  }


  loadTags = (params) => {
    this.props.dispatch({
      type: 'tags/loadTags',
      playload: params,
    });
  };


  loadArtiels = (params) => {
    this.setState({ params: params });
    this.props.dispatch({
      type: 'article/loadArticles',
      playload: params,
    });
    if (params && params.catalogId) this.loadTags(params);
  };


  toDetail = (item) => {
    this.props.history.push({
      pathname: '/article',
      query: { id: item.id, type: '1' },
    });
  };


  renderListItem = (item) => {
    return <List.Item className="app-item"
                      onClick={e => this.toDetail(item)}>

      <ArticleItem article={item}/>

    </List.Item>;
  };

  tagSelect = (id) => {
    id = this.state.selectedTag == id ? '' : id;
    this.setState({
      selectedTag: id,
    });
    this.loadArtiels({ tagId: id });
  };

  renderTags = () => {
    return this.props.tags.map((item, index) => {
      return <Tag
        key={index}
        className={this.state.selectedTag == item.id ? 'app-tag app-tag-select' : 'app-tag '}
        onClick={e => this.tagSelect(item.id)}
      >{item.name}</Tag>;
    });
  };

  catalogChange = (id) => {
    id = this.state.selectedCatalog == id ? '' : id;
    this.setState({ selectedCatalog: id, selectedTag: '' });
    this.loadArtiels({ catalogId: id });
  };

  renderCatalogs() {
    return <Menu mode="horizontal" style={{ lineHeight: '62px', border: 'none' }}
                 defaultSelectedKeys={['all']}>
      {
        <Menu.Item key='all' onClick={e => this.catalogChange('')}>
          全部
        </Menu.Item>
      }
      {
        this.props.catalogs.map((item, index) => {
          return <Menu.Item key={index} onClick={e => this.catalogChange(item.id)}>
            {item.name}
          </Menu.Item>;
        })
      }
    </Menu>;
  }


  renderArticleTags = () => {
    if (this.state.selectedCatalog != '') {
      return <div className="app-tags">
        {this.props.tags.length > 0 ? <Tag key='all'
                                           className={this.state.selectedTag == '' ? 'app-tag app-tag-select' : 'app-tag '}
                                           onClick={e => this.tagSelect('')}>全部</Tag> : ''}
        {this.renderTags()}
      </div>;
    } else {
      return '';
    }
  };

  reanderRightArticle = () => {
    if (!this.props.recentArticles.records) return '暂无文章';
    return this.props.recentArticles.records.map((item, index) => {
      return <div key={index} onClick={e => this.toDetail(item)} className="app-recent">
        {item.name} - {item.createDate}
      </div>;
    });
  };

  onLoadMore = () => {
    let params = this.state.params;
    let current= this.state.current;
    current ++ ;
    params = Object.assign(params, { current: current, step: this.state.step });
    this.props.dispatch({
      type: 'article/loadArticles',
      playload: params,
    });
    this.setState({current:current})
  };


  render() {
    const isMore = this.props.articles.total > (this.state.current * this.state.step);
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

    return (

      <div className="pg-container">

        <div className="pg-content" style={{ marginTop: '15px' }}>

          <div className="app-catalogs">
            {this.renderCatalogs()}
          </div>

          {this.renderArticleTags()}

          <Row type="flex" className="pg-content">

            <List itemLayout="vertical"
                  className="app-list"
                  loadMore={loadMore}
                  loading={this.props.submitting}
                  dataSource={this.props.articles.records}
                  renderItem={item => this.renderListItem(item)}
            />


          </Row>

        </div>

        <div>
          <CustomRecommed title="近期更新">
            {this.reanderRightArticle()}
          </CustomRecommed>
        </div>

      </div>
    );
  }

}


// @ts-ignore
export default withRouter(IndexPage);
