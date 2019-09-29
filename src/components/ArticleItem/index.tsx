import React from 'react';
import './index.less';
import { Avatar, Tag } from 'antd';

const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue'];


class ArticleItem extends React.Component<{ article }, {}> {


  renderTags = (tas) => {
    return tas.map((item, index) => {
      let color = colors[index];
      return <Tag color={color} key={index}>{item}</Tag>;
    });
  };

  render() {

    const { article } = this.props;

    return <div className="ai-container">

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className='ai-title'>{article.name}</div>
        <div className='ai-tags'>
          {this.renderTags(article.tagList)}</div>
      </div>

      <div className='ai-tags'>{article.remark}</div>

      <div className='ai-tags'>
        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{article.author[0]}</Avatar>
        <div className='ai-desc'>创建时间: {article.createDate}</div>
        <div className='ai-desc'>更新时间: {article.updateDate}</div>
      </div>

      <div className='ai-catalog'>
        <div className='al-catalog-left'>
          <div className='al-catalog-top'/>
          <div className='al-catalog-bottom'/>
        </div>
        <div className='ai-catalog-content'>
          {article.catalogName}
        </div>
      </div>

    </div>;
  }
}

export default ArticleItem;

