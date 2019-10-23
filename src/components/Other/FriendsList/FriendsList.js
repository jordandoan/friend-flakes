import React, { useState, useEffect } from 'react';
import { Skeleton, Button, Icon } from 'antd';

import { axiosWithAuth } from '../../../utils';

const FriendsList = () => {
  let [friends, setFriends] = useState();
  const size = 'small';
  useEffect(() => {
    axiosWithAuth().get("http://localhost:5000/api/users/friends")
      .then(res => setFriends(res.data))
  }, [])
  console.log(friends);
  return (
    (!friends ? <Skeleton active/> : <div>
      <div>
        {friends.friends_list.map(friend => <div>{friend.name} {friend.username}</div>)}
      </div>
      <div>
        {friends.received_requests.map(friend => <div>
          <p>
            {friend.name} {friend.username}
            <Button.Group size="small">
              <Button type="primary" icon="plus" />
              <Button type="primary" icon="minus" />
            </Button.Group>
          </p>
          </div>
        )}
      </div>
      <div>
        {friends.sent_requests.map(friend => <div>{friend.name} {friend.username}</div>)}
      </div>
    </div>)
  )
}

export default FriendsList;
