import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';

import { logInUser, resetError } from '../../../actions';

const LoginForm = (props) => {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        props.form.validateFields();
        props.resetError();
    },[])

    useEffect(() => {
        if (props.error && loading) {
            props.history.push("/login");
        }
    },[props.error]);

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;

    const hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.logInUser(values);
                props.form.resetFields();
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

const mapStateToProps = state => {
    return {
        error: state.login_error
    }
};

export default connect(mapStateToProps, { logInUser: logInUser, resetError:resetError })(Form.create()(LoginForm));