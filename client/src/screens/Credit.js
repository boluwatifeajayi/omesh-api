import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
// import Spinner from '../layout/Spinner';
import CreditItem from '../components/CreditItem';
import CommentForm from '../components/CommentForm';
import CommentItem from '../components/CommentItem';
import { getCredit } from '../actions/credit';

const Credit = ({ getCredit, credit: { credit, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getCredit(id);
  }, [getCredit, id]);

  return loading || credit === null ? (
    <h1>Loading...</h1>
  ) : (
    <section className="container">
      <Link to="/credits" className="btn">
        Back To Posts
      </Link>
      <CreditItem credit={credit} showActions={false} />
      <CommentForm creditId={credit._id} />
      <div className="comments">
        {credit.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} creditId={credit._id} />
        ))}
      </div>
    </section>
  );
};

Credit.propTypes = {
  getCredit: PropTypes.func.isRequired,
  credit: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  credit: state.credit
});

export default connect(mapStateToProps, { getCredit })(Credit);
