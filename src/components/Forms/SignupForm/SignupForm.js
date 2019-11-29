import React, { useState, useEffect } from 'react';
import { Form, Button, Icon, Input } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signUpUser } from '../../../actions';

import './SignupForm.scss';

const SignupPage = (props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {

    }, [])

    useEffect(() => {
        if (props.username) {
            props.history.push("/");
        }
        if (props.error || props.signup_success) {
            setLoading(false);
        }

    },[props.username, props.error, props.signup_success])

    const { getFieldDecorator } = props.form;

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                props.signUpUser(values);
            } else {
                setLoading(false);
            }
        });
    };

    return (
        <div className="signup-container">
            { props.signup_success && <p>{props.signup_success} <Link to="/login">Log in </Link></p>}
            { props.error && <p>{props.error}</p>}
            <h2>Sign Up</h2>
            <Form onSubmit={(e) => handleSubmit(e)} className="signup-form">
                <div className="names">
                    <Form.Item>
                        {getFieldDecorator('first_name', {
                            rules: [{ required: true, message: 'Please input your first name!' }],
                            })(
                                <Input
                                    size="large"
                                    prefix={<Icon type="contacts" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="first_name"
                                    placeholder="First Name"
                                />,
                            )}
                    </Form.Item>
                    <Form.Item className="last-name">
                        {getFieldDecorator('last_name', {
                            })(
                                <Input
                                    size="large"
                                    prefix={<Icon type="contacts" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="last_name"
                                    placeholder="Last Name (Optional)"
                                />,
                        )}
                    </Form.Item>
                </div>
                <Form.Item className="fields">
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            size="large"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item className="fields">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                size="large"
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                </Form.Item>
            <Form.Item className="fields">
                <Button type="primary" htmlType="submit" loading={loading} icon="login" onClick={() => setLoading(true)}>
                    Sign Up
                </Button>
            </Form.Item>
        </Form>
      </div>
    )
}

const mapStateToProps = state => {
    return {
        username: state.username,
        signup_success: state.signup_success,
        error: state.signup_error,
    } 
}

export default connect(mapStateToProps, {signUpUser: signUpUser})(Form.create()(SignupPage));
