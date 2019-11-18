import React from 'react';
import { Card, Icon } from 'antd';
import { Link } from 'react-router-dom';

import './EventCard.scss';

const EventCard = ({ event }) => {
  return (
    <Card 
      className="event-card"
      title={event.title} 
      extra={<Link to={`/events/${event.id}`}>More</Link>} 
      style={{width:300}}
      actions={[<span>{event.people} <Icon type="smile" theme="filled" /></span>, [<span>{event.people} <Icon type="crown" theme="filled" /></span>]]}
    >
      <p>{event.description || "An event"}</p>
      <Card.Meta description={event.date.toString().substring(4,15)}/>
    </Card>
  )
}

export default EventCard;