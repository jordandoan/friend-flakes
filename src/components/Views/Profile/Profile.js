import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../../utils';

const Profile = (props) => {
  console.log(props.match.params.username);
  let [user, userData] = useState();

  useEffect(() => {

  })

  return ( 
    <div>Profile</div>
  )
}

export default Profile;