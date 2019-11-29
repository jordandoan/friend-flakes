import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import EventCard from '../../Other/EventCard';
// import FriendsList from '../../Other/FriendsList';
import EventForm from '../../Forms/EventForm';


import './Dashboard.scss';
import { getUserInfo } from '../../../actions';

const Dashboard = (props) => {
    let user = props.user_data;
    let pastEvents;
    let createdFutureEvents;
    let otherFutureEvents;
    if (user) {
        [pastEvents, createdFutureEvents, otherFutureEvents] = sortEvents(user.events, user.id);
    }

    useEffect(() => {
      props.getUserInfo(props.username);
    }, [])
    
    return (
        <div>
            <EventForm />
            {props.loading && <Spin className="spinner" size="large"/>}
            {user &&
                <>
                <h2>Hello, {props.username}</h2>
                {/* <FriendsList /> */}

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
        event.date = new Date(event.date);
        if (event.date.getTime() < time) {
            pastEvents.push(event)
        } else {
            if (event.user_id === id) {
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
        loading: state.loading,
    }
}
export default connect(mapStateToProps, { getUserInfo: getUserInfo })(Dashboard);
