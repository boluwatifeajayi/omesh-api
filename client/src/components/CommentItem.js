import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../utils/formatDate';
import { deleteComment } from '../actions/credit';

const CommentItem = ({
  commentId,
  comment: { _id, agreementLetter, companyName, avatar, user, date },
  
  deleteComment
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{companyName}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{agreementLetter}</p>
      <p className="post-date">Posted on {formatDate(date)}</p>
     
        <button
          onClick={() => deleteComment(commentId, _id)}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times" />
        </button>
     
    </div>
  </div>
);

CommentItem.propTypes = {
  commentId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
