import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import GuestForm from '../../Forms/GuestForm';
import GuestCard from '../../Other/GuestCard';

import { getEventInfo, deleteEvent } from '../../../actions';

const EventInfo = (props) => {
  let event = props.event_data;

  useEffect(() => {
    props.getEventInfo(props.match.params.event_id);
  }, [])

  useEffect(() => {
    if (!event && props.called && !props.error) {
      props.history.push('/');
    }
  }, [props.called])

  return (
    <div>
      <Button onClick={() => props.history.push('/')}>Go Back</Button>
      I am the Event Info div
      {event && (<><p>Created by {event.full_name} @{event.created_by}</p>
      {event.created_by === props.username && <div>
          <Button onClick={() => props.history.push(`/events/${props.match.params.event_id}/edit`)}>Edit Event Info</Button>
          <Button onClick={() => props.deleteEvent(event.id)}>Delete</Button>
          <GuestForm history={props.history} match={props.match} />
        </div>
      }
      <h2>{event.title}</h2>
      <p>Date: {new Date(event.date).toString().substring(0,15)}</p>
      <p>Points: {event.points}</p>
      <p>Description: {event.description}</p>
      <div>
        <p>Guests</p>
        {event.guests.map(guest => 
          <GuestCard guest={guest} eventId={event.id} createdBy={event.created_by}/>
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
    username: state.username,
    called: state.called,
    error: state.error,
  }
}

export default connect(mapStateToProps, { getEventInfo: getEventInfo, deleteEvent: deleteEvent })(EventInfo);