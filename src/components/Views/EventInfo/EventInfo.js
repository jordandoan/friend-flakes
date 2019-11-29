import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import GuestForm from '../../Forms/GuestForm';
import GuestCard from '../../Other/GuestCard';

import { getEventInfo, deleteEvent } from '../../../actions';

import './EventInfo.scss';

const EventInfo = (props) => {
  let event = props.event_data;

  useEffect(() => {
    props.getEventInfo(props.match.params.event_id);
  }, [])

  useEffect(() => {
    if (!event && props.called) {
      props.history.push('/');
    }
  }, [props.event_data])

  return (
    <div className="event-info-container">
      <Button className='go-back' onClick={() => props.history.push('/')}>Go Back</Button>
      
      {props.called && event && (<>
      {event.created_by === props.username && <div className="event-crud">
          <Button onClick={() => props.history.push(`/events/${props.match.params.event_id}/edit`)}>Edit Event Info</Button>
          <Button type="danger" onClick={() => props.deleteEvent(event.id)}>Delete</Button>
          <GuestForm history={props.history} match={props.match} />
        </div>
      }
      <div className="event-info">
        <h2>{event.title}</h2>
        <p>Created by {event.full_name} @{event.created_by}</p>
        <p>Date: {new Date(event.date).toString().substring(0,15)}</p>
        <p>{event.points} points </p>
        <p>Description: {event.description}</p>
      </div>
      <div className="guests">
        <h3>Guests</h3>
        <div className="guest-card-container">
          {event.guests.map(guest => 
            <GuestCard guest={guest} eventId={event.id} createdBy={event.created_by}/>
          )}
        </div>
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
    loading: state.loading,
  }
}

export default connect(mapStateToProps, { getEventInfo: getEventInfo, deleteEvent: deleteEvent })(EventInfo);