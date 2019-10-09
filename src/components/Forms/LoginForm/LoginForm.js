import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button } from 'antd';

const LoginForm = (props) => {

    useEffect(() => {
        props.form.validateFields();
    },[])

    const [loading, setLoading] = useState(false);
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;

    const hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                if (values.username !== "test" && values.password !== "password") {
                    props.history.push("/login")
                    props.form.resetFields();
                    setLoading(false);
                } else {
                    console.log("log in successful!");
                }
            }
        })
    }
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
            <div>
                <Form layout="inline" onSubmit={(e) => handleSubmit(e)} >
                    <Form.Item validateStatus={usernameError ? 'error' : ''} help="">
                        {getFieldDecorator('username', {
                            rules: [{ required: true}],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={passwordError ? 'error' : ''} help="">
                        {getFieldDecorator('password', {
                            rules: [{ required: true}],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} icon="login" onClick={() => setLoading(true)} disabled={hasErrors(getFieldsError())}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
    )
}

export default Form.create()(LoginForm);