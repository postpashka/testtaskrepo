import React from 'react';
import Tags from './Home/Tags';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../constants/actionTypes';

const FAVORITED_CLASS = 'btn btn-sm btn-success';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-success';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: ARTICLE_FAVORITED,
    payload: agent.Articles.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: ARTICLE_UNFAVORITED,
    payload: agent.Articles.unfavorite(slug)
  })
});

const ArticlePreview = props => {
  const article = props.article;
  const favoriteButtonClass = article.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (article.favorited) {
      props.unfavorite(article.slug);
    } else {
      props.favorite(article.slug);
    }
  };

  return (
    <div className="article-preview card my-3">
      <div className="card-body">
        <div className="article-meta media">
          <Link to={`/@${article.author.username}`}>
            <img src={article.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'} alt={article.author.username} className="direct-chat-img"/>
          </Link>
          <div className="media-body align-self-center">
            <Link className="author pull-left px-2" to={`/@${article.author.username}`}>
              {article.author.username}
            </Link>
            <span className="date pull-right">
              {new Date(article.createdAt).toDateString()}
            </span>
          </div>
        </div>
        <div className="article-body">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <ul className="tag-list p-0">

            {
              article.tagList.map(tag => {
                return (
                  <li className="tag-default badge badge-success m-1" key={tag}>
                    {tag}
                  </li>
                )
              })
            }
          </ul>
          <Link to={`/article/${article.slug}`} className={favoriteButtonClass}>
            <span>Read more...</span>
          </Link>
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
