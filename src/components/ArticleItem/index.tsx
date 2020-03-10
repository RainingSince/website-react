import React from 'react';
import './index.less';
import { Avatar, Tag } from 'antd';
import { getContext } from '@/utils/contextUtils';

const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue'];


class ArticleItem extends React.Component<{ article }, {}> {

  renderTags = (tas) => {
    const isPhone = getContext();
    return tas.map((item, index) => {
      let color = colors[index];
      return <Tag style={isPhone ? { border: 'none' } : {}} color={color} key={index}>{item}</Tag>;
    });
  };

  render() {

    const { article } = this.props;
    const isPhone = getContext();

    return <div className="ai-container">

      <div style={isPhone ? { display: 'flex', flexDirection: 'column' }
        : { display: 'flex', alignItems: 'center' }}>
        <div className={isPhone ? 'ai-title ai-title-phone' : 'ai-title'}>{article.name}</div>
        <div className='ai-tags'>
          {this.renderTags(article.tagList)}</div>
      </div>

      <div className='ai-tags' style={isPhone ? { fontSize: '12px' } : {}}>{article.remark}</div>

      <div className='ai-tags'>
        {isPhone ? '' : <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{article.author[0]}</Avatar>}
        <div style={isPhone ? { fontSize: '12px', marginLeft: 0 } : {}}
             className='ai-desc'>创建时间: {article.createDate}</div>
        <div style={isPhone ? { fontSize: '12px' } : {}} className='ai-desc'>更新时间: {article.updateDate}</div>
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

