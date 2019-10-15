import React from 'react';

import SignupForm from '../../Forms/SignupForm';

import './SignupPage.scss';

const SignupPage = (props) => {
    return (
        <div className="signup-page-container">
            <SignupForm history={props.history} />
        </div>
    )
}


export default SignupPage;
