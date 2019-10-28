import React, { useState, useEffect } from 'react';
import { Alert, Form, Button, Icon, Input } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logInUser, loginOnLoad } from '../../../actions';

import './LoginPage.scss';

const LoginPage = (props) => {
    const [loading, setLoading] = useState(false);
    const { getFieldDecorator } = props.form;
    
    useEffect(() => {
        props.loginOnLoad();
        setLoading(false);
    }, [])

    useEffect(() => {
        if (props.username) {
            props.history.push("/");
        }
        if (props.error) {
            setLoading(false);
        }
    }, [props.username, props.error])

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.logInUser(values);
                props.form.resetFields();
            } else {
                setLoading(false);
            }
        });
    };

    return (
        <div className="login-page-container">
            {props.error && <Alert className="alert" message="Error" description={props.error} type="error" closable showIcon />}
            <Form onSubmit={(e) => handleSubmit(e)} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} icon="login" onClick={() => setLoading(true)} >
                    Log in
                </Button>
                Or <Link to="/signup">register now!</Link>
            </Form.Item>
        </Form>
      </div>
    )
}

const mapStateToProps = state => {
    return {
        error: state.login_error,
        username: state.username
    }
};

export default connect(mapStateToProps, { logInUser: logInUser, loginOnLoad: loginOnLoad})(Form.create()(LoginPage));
