import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import marked from 'marked';
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: ARTICLE_PAGE_UNLOADED })
});

class Article extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Articles.get(this.props.match.params.id),
      agent.Comments.forArticle(this.props.match.params.id)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.article) {
      return null;
    }

    const markup = { __html: marked(this.props.article.body, { sanitize: true }) };
    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.article.author.username;
    return (
      <div className="container article-page">

        <div className="row article-content">
          <div className="col-md-12">

            <div className="card m-3">
              <div className="card-body">
                <ArticleMeta
                  article={this.props.article}
                  canModify={canModify} />
                 <h1>{this.props.article.title}</h1>
                 <div dangerouslySetInnerHTML={markup}></div>

                 <ul className="tag-list p-0">
                   {
                     this.props.article.tagList.map(tag => {
                       return (
                         <li
                           className="badge badge-success tag-default tag-pill tag-outline"
                           key={tag}>
                           {tag}
                         </li>
                       );
                     })
                   }
                 </ul>
              </div>
            </div>

          </div>
        </div>


        <div className="article-actions">
        </div>

        <div className="row">
          <CommentContainer
            comments={this.props.comments || []}
            errors={this.props.commentErrors}
            slug={this.props.match.params.id}
            currentUser={this.props.currentUser} />
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
