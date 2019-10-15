import React from 'react';

import SignupForm from '../../Forms/SignupForm';

import './Welcome.scss';

const Welcome = (props) => {
    return (
        <div className="welcome-container">
            <section>
                Insert Description
            </section>
            <section>
                <SignupForm history={props.history}/>
            </section>
        </div>
    )
}

export default Welcome;
