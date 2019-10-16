import React from 'react';
import './index.less';
import { connect } from 'dva';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/xcode.css';
import { Anchor, Carousel, Divider, Spin } from 'antd';
import CustomRecommed from '@/components/CustomRecommed';

const { Link } = Anchor;

interface LevelTree {
  level,
  title,
  children
}

// @ts-ignore
@connect(({ article, projects, loading }) => ({
  article: article.detail,
  project: projects.detail,
  submitting: loading.effects['article/loadDetail'],
  submittingP: loading.effects['projects/loadDetail'],
}))
class ArticlePage extends React.Component<{ article, submitting, submittingP, dispatch, history, project }, { targetOffset, type }> {

  constructor(props) {
    super(props);
    this.state = {
      targetOffset: 0,
      type: '',
    };
  }

  componentDidMount() {
    let id = this.props.history.location.query.id;
    let type = this.props.history.location.query.type;
    let path = type == '1' ? 'article/loadDetail' : 'projects/loadDetail';
    this.props.dispatch({
      type: path,
      playload: id,
    });
    this.setState({
      targetOffset: window.innerHeight / 2,
    });
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: code => hljs.highlightAuto(code).value,
    });
  }

  renderDir = (content) => {
    if (!content) return;
    const menu: LevelTree[] = [];
    const patt = /(#+)\s+?(.+)/g;
    let result;
    while ((result = patt.exec(content))) {
      menu.push({ level: result[1].length, title: result[2].replace('.', ''), children: [] });
    }
    return this.renderLevel(menu);
  };


  sortTree = (trees: LevelTree[], next: LevelTree) => {

    if (trees[0].level < next.level) {
      if (trees[trees.length - 1].children.length > 0) {
        this.sortTree(trees[trees.length - 1].children, next);
      } else {
        trees[trees.length - 1].children.push(next);
      }
    } else {
      trees.push(next);
    }
  };

  renderLink = (menus: LevelTree[]) => {
    return menus.map((item, index) => {
      let href = item.title.toLowerCase().replace(/\s*/g, '');
      if (item.children.length > 0) {
        return <Link title={item.title} href={`#${href}`} key={index}>
          {this.renderLink(item.children)}
        </Link>;
      } else {
        return <Link title={item.title} href={`#${href}`} key={index}/>;
      }
    });
  };

  renderLevel = (menus: LevelTree[]) => {
    let trees: LevelTree[] = [];
    menus.map((item, index) => {
      if (trees.length === 0) {
        trees.push(item);
      } else {
        this.sortTree(trees, item);
      }
    });

    return <Anchor offsetTop={104} showInkInFixed={true}>
      <Link href="#al-title" title={this.props.article.name}/>
      {this.renderLink(trees)}
    </Anchor>;
  };

  renderImageList = () => {
    if (this.state.type == '1') return '';
    if (this.props.project.imageList) {
      return <div className='pg-content' style={{ height: '300px' }}>
        <Carousel autoplay>
          {this.props.project.imageList.split(',').map((item, index) => {
            return <img className='al-image' key={index} src={item}/>;
          })}
        </Carousel>
      </div>;
    } else return '';

  };


  render() {

    let type = this.props.history.location.query.type;

    const detail = type == '1' ? this.props.article : this.props.project;

    const content = detail.content ? detail.content : '';
    const loading = type == '1' ? this.props.submitting : this.props.submittingP;

    return <div className='pg-container'>


      <Spin size="large" spinning={loading}>
        <div>

          <div className='al-title' id='al-title'>
            <h1>
              {detail.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>作者：{detail.author}</div>
              <div style={{ marginLeft: '30px' }}>创建时间：{detail.createDate}</div>
              <div style={{ marginLeft: '30px' }}>更新时间：{detail.updateDate}</div>
            </div>
          </div>

          <Divider/>

          {/*{this.renderImageList()}*/}


          <div className='pg-content markdown-css'
               style={{ marginTop: '30px' }}
               dangerouslySetInnerHTML={{ __html: marked(content) }}
          />

        </div>
      </Spin>

      <div>

        {/*<CustomRecommed title="相关笔记">*/}
        {/*<div>123</div>*/}
        {/*</CustomRecommed>*/}
        <Spin size="large" spinning={loading}>
          <CustomRecommed title="目录结构">
            {this.renderDir(content)}
          </CustomRecommed>
        </Spin>
      </div>

    </div>;
  }

}

export default ArticlePage;
