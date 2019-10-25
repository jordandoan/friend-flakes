import React, { useState, useEffect } from 'react';
import { Skeleton, Button, Tabs } from 'antd';

import { axiosWithAuth } from '../../../utils';


import './FriendsList.scss';

const FriendsList = () => {
  let [friends, setFriends] = useState();

  useEffect(() => {
    axiosWithAuth().get("http://localhost:5000/api/users/friends")
      .then(res => setFriends(res.data))
  }, [])

  return (
      (!friends ? <Skeleton active/> :   
      <div className="tabs-container">
        <Tabs tabPosition="left">
          <Tabs.TabPane tab="Friends List" key="1">
            {friends.friends_list.map(friend => <p>{friend.name} {friend.username}</p>)}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Received Requests" key="2">
          {friends.received_requests.map(friend =>
              <p>
                {friend.name} {friend.username}
                <Button.Group size="small">
                  <Button type="primary" className="accept" icon="check-circle" />
                  <Button type="danger" icon="close-circle" />
                </Button.Group>
              </p>
            )}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Sent Requests" key="3">
            {friends.sent_requests.map(friend =>               
              <p>
                {friend.name} {friend.username}
                <Button.Group size="small">
                  <Button type="danger" icon="minus" />
                </Button.Group>
              </p>)}
          </Tabs.TabPane>
        </Tabs>
      </div>)
  )
}

export default FriendsList;
