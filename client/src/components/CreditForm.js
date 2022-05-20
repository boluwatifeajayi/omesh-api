import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCredit } from '../actions/credit';

const CreditForm = ({ addCredit }) => {
  const [text, setText] = useState('');

  return (
    <div className='credit-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addCredit({ text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a credit'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CreditForm.propTypes = {
  addCredit: PropTypes.func.isRequired
};

export default connect(
  null,
  { addCredit }
)(CreditForm);
