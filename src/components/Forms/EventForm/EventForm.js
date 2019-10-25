import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button, DatePicker, InputNumber } from 'antd';
import moment from 'moment';

import './EventForm.scss';

const EventForm = (props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    props.form.validateFields();
  },[])

  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;

  const hasErrors = (fieldsError) => {
      return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      props.form.validateFields((err, values) => {
          console.log(values);
          if (!err) {
              props.form.resetFields();
          }
      })
  }
  const usernameError = isFieldTouched('username') && getFieldError('username');
  const passwordError = isFieldTouched('password') && getFieldError('password');
  const dateFormat = 'MM/DD/YYYY';
  return (
          <div>
              <Form onSubmit={(e) => handleSubmit(e)} >
                  <Form.Item validateStatus={usernameError ? 'error' : ''} help="">
                      {getFieldDecorator('title', {
                          rules: [{ required: true}],
                      })(
                          <Input
                              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              placeholder="Title"
                          />,
                      )}
                  </Form.Item>
                  <Form.Item validateStatus={passwordError ? 'error' : ''} help="">
                      {getFieldDecorator('points', {
                          rules: [{ required: true}],
                      })(
                          <InputNumber
                              style={{width: '500px'}}
                              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />}
                              placeholder="Flake Points"
                          />,
                      )}
                  </Form.Item>
                  <Form.Item validateStatus={usernameError ? 'error' : ''} help="">
                      {getFieldDecorator('date', {
                          rules: [{ required: true}],
                      })(
                          <DatePicker initialValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
                      )}
                  </Form.Item>
                  <Form.Item validateStatus={usernameError ? 'error' : ''} help="">
                      {getFieldDecorator('description', {
                      })(
                          <Input.TextArea
                              placeholder="Description (optional)"
                          />,
                      )}
                  </Form.Item>
                  <Form.Item>
                      <Button type="primary" htmlType="submit" loading={loading} icon="login" onClick={() => setLoading(true)}>
                          Create Event
                      </Button>
                  </Form.Item>
              </Form>
          </div>
  )
}

export default Form.create()(EventForm);