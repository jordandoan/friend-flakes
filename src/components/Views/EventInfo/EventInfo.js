import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { getEventInfo } from '../../../actions';

const EventInfo = (props) => {
  let event = props.event_data;
  useEffect(() => {
    props.getEventInfo(props.match.params.event_id);
    console.log(props.event_data);
  }, [])

  return (
    <div>
      <Button onClick={() => props.history.push('/')}>Go Back</Button>
      I am the Event Info div
      {event && (<><p>Created by {event.full_name} @{event.created_by}</p>
      {event.created_by == props.username && <div>
          <Button onClick={() => props.history.push(`/events/${props.match.params.event_id}/edit`)}>Edit Event Info</Button>
          <Button>Delete</Button>
          <Button>Invite guests</Button>
      </div>
      }
      <h2>{event.title}</h2>
      <p>Date: {new Date(event.date).toString().substring(0,15)}</p>
      <p>Points: {event.points}</p>
      <p>Description: {event.description}</p>
      <div>
        <p>Guests</p>
        {event.guests.map(guest => 
          <div>
            <p>{guest.full_name} @{guest.username} {guest.attended ? "Attending" : "Flaking"}</p>
          </div>
        )}
      </div>
      </>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    event_data: state.event_data,
    username: state.username
  }
}

export default connect(mapStateToProps, { getEventInfo: getEventInfo })(EventInfo);