import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { ADD_COMMENT } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: ADD_COMMENT, payload })
});

class CommentInput extends React.Component {
  constructor() {
    super();
    this.state = {
      body: ''
    };

    this.setBody = ev => {
      this.setState({ body: ev.target.value });
    };

    this.createComment = ev => {
      ev.preventDefault();
      const payload = agent.Comments.create(this.props.slug,
        { body: this.state.body });
      this.setState({ body: '' });
      this.props.onSubmit(payload);
    };
  }

  render() {
    return (
      <form className="card comment-form my-3" onSubmit={this.createComment}>
        <div className="card-block">
          <textarea className="form-control"
            placeholder="Write a comment..."
            value={this.state.body}
            onChange={this.setBody}
            rows="3">
          </textarea>
        </div>
        <div className="card-block p-1">
          <div className="media">
            <img
              src={this.props.currentUser.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
              className="comment-author-img direct-chat-img"
              alt={this.props.currentUser.username} />
              <div className="media-body align-self-center">
                <span className="pull-left px-2 py-1">{this.props.currentUser.username}</span>
                <button
                  className="btn btn-sm btn-primary pull-right"
                  type="submit">
                  Post Comment
                </button>
              </div>
          </div>
        </div>
      </form>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
