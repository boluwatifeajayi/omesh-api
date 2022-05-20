import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../actions/credit';

const CommentForm = ({ creditId, addComment }) => {
  const [agreementLetter, setAgreementLetter] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a Comment</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addComment(creditId, { agreementLetter });
          setAgreementLetter('');
        }}
      >
        <textarea
          name='agreementLetter'
          cols='30'
          rows='5'
          placeholder='Comment the post'
          value={agreementLetter}
          onChange={e => setAgreementLetter(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
