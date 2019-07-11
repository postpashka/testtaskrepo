import ArticleActions from './ArticleActions';
import { Link } from 'react-router-dom';
import React from 'react';

const ArticleMeta = props => {
  const article = props.article;
  return (
    <div className="article-meta media">
      <Link to={`/@${article.author.username}`}>
        <img src={article.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'} className="direct-chat-img"/>
      </Link>
      <div className="media-body align-self-center">
        <Link to={`/@${article.author.username}`} className="author pull-left px-2 py-1">
          {article.author.username}
        </Link>
        <span className="date pull-right">
          {new Date(article.createdAt).toDateString()}
        </span>
        <ArticleActions canModify={props.canModify} article={article} />
      </div>
    </div>
  );
};

export default ArticleMeta;
