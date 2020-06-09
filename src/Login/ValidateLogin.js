import React from 'react';
import PropTypes from 'prop-types'

export default function ValidateLogin(props) {
  if (props.message) {
    return (
      <div className="error">{props.message}</div>
    );
  }
  return <></>
}

ValidateLogin.propTypes = {
  message: PropTypes.string
}