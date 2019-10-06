import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

const Login = (props) => {
    return (
            <Form layout="inline">
                <Form.Item>
                    <Input
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
            </Form>
    )
}

export default Login;