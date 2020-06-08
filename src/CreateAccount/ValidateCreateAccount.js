import React from 'react';
import PropTypes from 'prop-types'

export default function ValidateCreateAccount(props) {
  if (props.message) {
    return (
      <div className="error">{props.message}</div>
    );
  }
  return <></>
}

ValidateCreateAccount.propTypes = {
  message: PropTypes.string
}