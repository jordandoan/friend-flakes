import React from 'react';
import { Link } from 'react-router-dom';

const UserLink = (props) => {
  return (<Link to={`/users/${props.username}`} className="username-link">{props.username}</Link>)
}

export default UserLink;

