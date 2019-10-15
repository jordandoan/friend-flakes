import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import './Dashboard.scss';

const Dashboard = (props) => {
    let user = props.user_data;

    let pastEvents;
    let createdFutureEvents;
    let otherFutureEvents;

    if (user) {
        [pastEvents, createdFutureEvents, otherFutureEvents] = sortEvents(user.events, user.id);
    }

    return (
        <div>
            {!user && <Spin className="spinner" size="large"/>}
            {user && 
                <div>
                    <h2>Hello, {user.first_name}</h2>
                    Upcoming Events:
                    Your Events:
                    {createdFutureEvents.map(event => 
                        <div>
                            {event.name} <br />
                            {event.date.toString().substring(0,15)} <br />
                            {event.points} <br />
                        </div>
                    )}
                    Other Events:
                    {otherFutureEvents.map(event => 
                        <div>
                            <p>{event.name}</p>
                            <p>{event.date.toString().substring(0,15)}</p>
                            <p>Points: {event.points}</p>
                        </div>
                    )}
                    Past Events:
                    {pastEvents.map(event => 
                        <div>
                            <p>{event.name}</p>
                            <p>{event.date.toString().substring(0,15)}</p>
                            <p>Points: {event.points}</p>
                            <p>{event.attended}</p>
                        </div>
                    )}
                    
                </div>
            }
        </div>
    )
}

function sortEvents(events, id) {
    let time = new Date().getTime();
    let pastEvents = [];
    let yourFuture = [];
    let otherFuture = [];
    events.forEach(event => {
        if (event.date.getTime() < time) {
            pastEvents.push(event)
        } else {
            if (event.created_by == id) {
                yourFuture.push(event)
            } else {
                otherFuture.push(event);
            }
        }
    });
    return [ pastEvents, yourFuture, otherFuture ]
}
const mapStateToProps = state => {
    return {
        user_data: state.user_data
    }
}
export default connect(mapStateToProps, {})(Dashboard);
