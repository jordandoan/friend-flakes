import React, { useState } from 'react';
import { Alert, Form, Button, Icon, Input } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logInUser } from '../../../actions';

import './LoginPage.scss';

const LoginPage = (props) => {
    const [loading, setLoading] = useState(false);
    const { getFieldDecorator } = props.form;

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                // LOG IN
            }
        });
    };

    return (
        <div className="login-page-container">
            {props.error_message && <Alert className="alert" message="Error" description={props.error_message} type="error" closable showIcon />}
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
        error: state.error,
        error_message: state.error_message
    }
};

export default connect(mapStateToProps, { logInUser: logInUser })(Form.create()(LoginPage));
