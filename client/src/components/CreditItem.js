import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import { connect } from 'react-redux';
import { deleteCredit } from '../actions/credit';

const CreditItem = ({
  
  deleteCredit,
  credit: { _id, agreementLetter, payback, companyName, avatar, user, likes, comments, date },
  showActions
}) => (
  <div className="credit bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>hi{companyName}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{agreementLetter}</p>
      <p className="credit-date">Posted on {formatDate(date)}</p>

      {showActions && (
        <Fragment>
          
          <Link to={`/credits/${_id}`} className="btn btn-primary">
            Discussion{' '}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
         
            <button
              onClick={() => deleteCredit(_id)}
              type="button"
              className="btn btn-danger"
            >
              delete
            </button>
          
        </Fragment>
      )}
    </div>
  </div>
);

CreditItem.defaultProps = {
  showActions: true
};

CreditItem.propTypes = {
  credit: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteCredit: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteCredit })(
  CreditItem
);
