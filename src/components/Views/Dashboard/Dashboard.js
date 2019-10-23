import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import EventCard from '../../Other/EventCard';
import FriendsList from '../../Other/FriendsList';

import './Dashboard.scss';

const Dashboard = (props) => {
    let token = localStorage.getItem('token');
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
            {user && token &&
                <>
                <FriendsList />       
                <h2>Hello, {props.username}</h2>
                <div className="events-container">
                    <h2>Upcoming Events:</h2>
                    <div>
                        <h3>Your Events:</h3>
                        <div className="event-card-container">
                            {createdFutureEvents.map(event => 
                                <EventCard event={event} />
                            )}
                        </div>
                    </div>
                    <div>
                        <h3>Other Events:</h3>
                        <div className="event-card-container">
                        {otherFutureEvents.map(event => 
                            <EventCard event={event} />
                        )}
                        </div>
                    </div>
                </div>
                <div className="events-container">
                    <h3>Past Events:</h3>
                    <div className="event-card-container">
                        {pastEvents.map(event => 
                            <EventCard event={event} />
                        )}
                    </div>
                </div>
             
                </>
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
        user_data: state.user_data,
        username: state.username,
    }
}
export default connect(mapStateToProps, {})(Dashboard);
