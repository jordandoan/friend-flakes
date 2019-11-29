import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Icon, InputNumber, DatePicker  } from 'antd';
import moment from 'moment';

import { axiosWithAuth } from '../../../utils';
import { editEventInfo } from '../../../actions';

import './EditEvent.scss';

const EditEvent = (props) => {
  const dateFormat = 'MM/DD/YYYY';
  let [called, setCalled] = useState(false);
  let [event, setEvent] = useState(props.event);

  useEffect(() => {
    axiosWithAuth().get(`/api/events/${props.match.params.event_id}`)
      .then(res => setEvent(res.data))
  }, [])
  
  useEffect(() => {
    if (event) {
      if (event.created_by !== props.username) {
        props.history.goBack();
      } else {
        let { date, title, description, points} = event
        props.form.setFieldsValue({date: moment(new Date(date), dateFormat), title, description, points});
      }
    }
    if (called && !props.error) {
      props.history.goBack();
    }
  }, [props.loading])

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
			if (!err) {
        setCalled(props.called)
        props.editEventInfo({...event, ...values});
			}
		});
  }

  const { getFieldDecorator } = props.form;

  return (
    <div className="edit-event-form">
      <Button className='go-back' onClick={() => props.history.goBack()}>Go Back</Button>
      <h2>Edit Event</h2>
      {event &&
        <Form onSubmit={handleSubmit}>
            <Form.Item>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please enter a title' }],
              })(
                <Input
                  prefix={
                    <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='Title'
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('points', {
                rules: [{ required: true, message: 'Please enter an integer' }],
              })(
                <InputNumber
                  prefix={
                    <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='Flake Points'
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('date', {
                rules: [{ required: true, message: 'Date required' }],
              })(            <DatePicker format={dateFormat} />)}

            </Form.Item>
            <Form.Item>
              {getFieldDecorator(
                'description',
                {},
              )(<Input.TextArea placeholder='Description (optional)' />)}
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Save changes</Button>
            </Form.Item>
        </Form>
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.username,
    called: state.called,
    loading: state.loading,
    error: state.error,
    event: state.event_data
  }
}

export default connect(mapStateToProps, { editEventInfo: editEventInfo })(Form.create()(EditEvent));