import React from 'react';
import { Form, Button, Icon, Input } from 'antd';

import './LoginPage.scss';

const LoginPage = (props) => {
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
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <a href="">register now!</a>
            </Form.Item>
        </Form>
      </div>
    )
}

export default Form.create()(LoginPage);
