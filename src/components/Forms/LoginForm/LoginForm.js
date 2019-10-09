import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

const LoginForm = (props) => {
    return (
            <div>
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
    )
}

export default LoginForm;