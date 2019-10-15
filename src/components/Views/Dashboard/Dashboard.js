import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import './Dashboard.scss';

const Dashboard = (props) => {
    let user = props.user_data;
    console.log(user);
    let createdEvents = [];
    let otherEvents = [];
    if (user) {
        user.events.forEach(event => {
            if (event.created_by === user.id) {
                createdEvents.push(event);
            } else {
                otherEvents.push(event);
            }
        }
    )}

    return (
        <div>
            {!user && <Spin className="spinner" size="large"/>}
            {user && 
                <div>
                    <h2>Hello, {user.first_name}</h2>
                    Your Events: 
                    {createdEvents.map(event => 
                        <div>
                            {event.name}
                            {event.date}
                            {event.points}
                        </div>
                    )}
                    Other Events:
                    {otherEvents.map(event => 
                        <div>
                            {event.name}
                            {event.date}
                            {event.points}
                            {event.attended}
                        </div>
                    )}
                    
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user_data: state.user_data
    }
}
export default connect(mapStateToProps, {})(Dashboard);
