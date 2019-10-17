import React from 'react';
import { Card, Icon } from 'antd';

import './EventCard.scss';

const EventCard = ({ event }) => {
  return (
    <Card 
      className="event-card"
      title={event.name} 
      extra={<a href="/">More</a>} 
      style={{width:300}}
      actions={[<span>{event.people} <Icon type="smile" theme="filled" /></span>, [<span>{event.people} <Icon type="crown" theme="filled" /></span>]]}
      hoverable
    >
      <p>{event.description}</p>
      <Card.Meta description={event.date.toString().substring(4,15)}/>
    </Card>
  )
}

export default EventCard;