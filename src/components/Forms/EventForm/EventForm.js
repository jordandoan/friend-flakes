import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button, DatePicker, InputNumber } from 'antd';
import moment from 'moment';

import './EventForm.scss';

const EventForm = (props) => {
  const [loading, setLoading] = useState(false);

  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue } = props.form;

  const hasErrors = (fieldsError) => {
      return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      props.form.validateFields((err, values) => {
          console.log(values.names);
          if (!err) {
              alert("successful!");
          }
      })
  }

  const [id, setId] = useState(0);
  const remove = k => {
    const { form } = props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  const add = () => {
    const { form } = props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id);
    setId(id+1);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };
  getFieldDecorator('keys', { initialValue: [] });
  const keys = getFieldValue('keys');
  const formItems = keys.map((k, index) => (
    <Form.Item
      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
      label={index === 0 ? 'Guests' : ''}
      required={false}
      key={k}
    >
      {getFieldDecorator(`names[${k}]`, {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [
          {
            required: true,
            whitespace: true,
            message: "Please enter guest name or delete this field.",
          },
        ],
      })(<Input placeholder="Username" style={{ width: '60%', marginRight: 8 }} />)}
      {keys.length > 1 ? (
        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          onClick={() => remove(k)}
        />
      ) : null}
    </Form.Item>
  ));

  const dateFormat = 'MM/DD/YYYY';

  return (
          <div>
              <Form onSubmit={(e) => handleSubmit(e)} >
                  <Form.Item>
                      {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Please enter a title' }],
                      })(
                          <Input
                              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              placeholder="Title"
                          />,
                      )}
                  </Form.Item>
                  <Form.Item>
                      {getFieldDecorator('points', {
                        rules: [{ required: true, message: 'Please enter an integer' }],
                      })(
                          <InputNumber
                              style={{width: '500px'}}
                              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />}
                              placeholder="Flake Points"
                          />,
                      )}
                  </Form.Item>
                  <Form.Item>
                      {getFieldDecorator('date', {
                          rules: [{ required: true, message: "Date required"}],
                      })(
                          <DatePicker initialValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
                      )}
                  </Form.Item>
                  <Form.Item>
                      {getFieldDecorator('description', {
                      })(
                          <Input.TextArea
                              placeholder="Description (optional)"
                          />,
                      )}
                  </Form.Item>
                  {formItems}
                  <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={add} style={{ width: '60%' }}>
                      <Icon type="plus" /> Add Guest
                    </Button>
                  </Form.Item>
                  <Form.Item>
                      <Button type="primary" htmlType="submit" loading={loading} icon="login">
                          Create Event
                      </Button>
                  </Form.Item>
              </Form>
          </div>
  )
}

export default Form.create()(EventForm);