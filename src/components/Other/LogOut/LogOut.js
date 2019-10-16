import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'antd';

import { logOut } from '../../../actions';

import './LogOut.scss';

const LogOut = (props) => {
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      props.logOut();
    }
    setTimeout(() => props.history.push("/"), 500);
  }, [])

  return (
    <Alert className="logout"
      message="Please wait"
      description="Logging out... "
      type="info"
      showIcon
    />
  )
}

export default connect(null, { logOut: logOut })(LogOut);