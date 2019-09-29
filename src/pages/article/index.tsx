import React from 'react';
import './index.less';
import { connect } from 'dva';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/xcode.css';
import { Anchor, Divider } from 'antd';
import CustomRecommed from '@/components/CustomRecommed';

const { Link } = Anchor;

interface LevelTree {
  level,
  title,
  children
}

// @ts-ignore
@connect(({ article, loading }) => ({
  article: article.detail,
  submitting: loading.effects['article/loadDetail'],
}))
class ArticlePage extends React.Component<{ article, dispatch, history }, { targetOffset }> {

  constructor(props) {
    super(props);
    this.state = {
      targetOffset: 0,
    };
  }

  componentDidMount() {
    let id = this.props.history.location.query.id;
    this.props.dispatch({
      type: 'article/loadDetail',
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
    console.log(menu);
    return this.renderLevel(menu);
  };


  sortTree = (trees: LevelTree[], next: LevelTree) => {
    if (trees[0].level < next.level) {
      if (trees[0].children.length > 0) {
        this.sortTree(trees[0].children, next);
      } else {
        trees[trees.length - 1].children.push(next);
      }
    } else {
      trees.push(next);
    }
  };

  renderLink = (menus: LevelTree[]) => {
    return menus.map((item, index) => {
      if (item.children.length > 0) {
        return <Link title={item.title} href={`#${item.title}`} key={item.title}>
          {this.renderLink(item.children)}
        </Link>;
      } else {
        return <Link title={item.title} href={`#${item.title}`} key={item.title}/>;
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


  render() {

    const content = this.props.article.content ? this.props.article.content : '';

    return <div className='pg-container'>

      <div>

        <div className='al-title' id='al-title'>
          <h1>
            {this.props.article.name}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>创建时间：{this.props.article.createDate}</div>
            <div style={{ marginLeft: '30px' }}>更新时间：{this.props.article.updateDate}</div>
          </div>
        </div>

        <Divider/>

        <div className='pg-content markdown-css'
             style={{ marginTop: '30px' }}
             dangerouslySetInnerHTML={{ __html: marked(content) }}
        />

      </div>

      <div>

        {/*<CustomRecommed title="相关笔记">*/}
          {/*<div>123</div>*/}
        {/*</CustomRecommed>*/}

        <CustomRecommed title="目录结构">
          {this.renderDir(content)}
        </CustomRecommed>

      </div>

    </div>;
  }

}

export default ArticlePage;
