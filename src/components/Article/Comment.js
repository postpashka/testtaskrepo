import DeleteButton from './DeleteButton';
import { Link } from 'react-router-dom';
import React from 'react';

const Comment = props => {
  const comment = props.comment;
  const show = props.currentUser &&
    props.currentUser.username === comment.author.username;
  return (
    <div className="card my-2">
      <div className="card-block p-1">
        <div className="direct-chat-msg">
          <div className="direct-chat-info clearfix">
            <Link
              to={`/@${comment.author.username}`}
              className="direct-chat-name float-left">
              {comment.author.username}
            </Link>
            <span className="date-posted direct-chat-timestamp float-right">
              {new Date(comment.createdAt).toDateString()}
            </span>
            <span className="float-right">
              <DeleteButton show={show} slug={props.slug} commentId={comment.id} />
            </span>
          </div>
          <Link
            to={`/@${comment.author.username}`}
            className="comment-author direct-chat-img">
            <img src={comment.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'} className="comment-author-img direct-chat-img" alt={comment.author.username} />
          </Link>
          <div class="direct-chat-text">
            {comment.body}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Comment;
