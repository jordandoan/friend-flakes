import React from 'react';

import SignupForm from '../../Forms/SignupForm';

import './Welcome.scss';

const Welcome = (props) => {
    return (
        <div className="welcome-container">
            <section className="description">
                <h2>Welcome to Friend Flakes</h2>
                <p>Track events created by you and your friends, and see who flakes the most!</p>
                <p>Features include:</p>
                    <ul>
                        <li>Friend System: Add people you know!</li>
                        <li>Point system: Track the total points from all of the events you missed out on. The less points, the better!</li>
                        <li>Create events and invite friends</li>
                        <li>View leaderboards: Coming soon</li>
                    </ul>

            </section>
            <section>
                <SignupForm history={props.history}/>
            </section>
        </div>
    )
}

export default Welcome;
