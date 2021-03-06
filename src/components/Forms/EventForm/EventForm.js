import React, { useState, useEffect } from 'react';
import {
	Form,
	Icon,
	Input,
	Button,
	DatePicker,
	InputNumber,
	Modal,
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import { postEventInfo } from '../../../actions';

import './EventForm.scss';

const EventForm = props => {
	const [confirmLoading, setLoading] = useState(false);

	const { getFieldDecorator, getFieldValue } = props.form;

	useEffect(() => {
	  if (props.called && !props.error) {
      props.setVis(false);
      setLoading(false);
      props.form.resetFields();
	  } else if (props.error) {
      setLoading(false);
    }
	}, [props.called])

	const handleSubmit = e => {
		e.preventDefault();
		props.form.validateFields((err, values) => {
			const { keys, names, ...rest } = values;
			if (!err) {
        setLoading(true);
				props.postEventInfo(rest, names || []);
			}
		});
	};

	const [id, setId] = useState(0);
	const remove = k => {
		const { form } = props;
		// can use data-binding to get
		const keys = form.getFieldValue('keys');
		// We need at least one passenger
		if (keys.length === 0) {
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
		setId(id + 1);
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
  let reg = new RegExp('^(?!' + props.username + '$).*$')
	const formItems = keys.map((k, index) => (
		<Form.Item
			{...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
			label={index === 0 ? 'Guests' : ''}
			required={false}
			key={k}>
			{getFieldDecorator(`names[${k}]`, {
				validateTrigger: ['onChange', 'onBlur'],
				rules: [
					{
            pattern: reg,
						required: true,
						whitespace: true,
						message: 'Please enter guest name or delete this field. Name cannot be own username!',
					},
				],
			})(<Input placeholder='Username' style={{ width: '60%' }} />)}
			{keys.length > 0 ? (
				<Icon
					className='dynamic-delete-button'
					type='minus-circle-o'
					onClick={() => remove(k)}
				/>
			) : null}
		</Form.Item>
	));

	const dateFormat = 'MM/DD/YYYY';

	return (
		<Modal
			visible={props.visible}
			title='Create a new collection'
			okText='Create'
			onCancel={props.onCancel}
			onOk={e => handleSubmit(e)}
			confirmLoading={confirmLoading}>
			<div className='event-form-container'>
				<Form onSubmit={e => handleSubmit(e)}>
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
								style={{ width: '500px' }}
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
						})(
							<DatePicker
								defaultValue={moment('2015/01/01', dateFormat)}
								format={dateFormat}
							/>,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator(
							'description',
							{},
						)(<Input.TextArea placeholder='Description (optional)' />)}
					</Form.Item>
					{formItems}
					<Form.Item {...formItemLayoutWithOutLabel}>
						<Button type='dashed' onClick={add}>
							<Icon type='plus' /> Add Guest
						</Button>
					</Form.Item>
				</Form>
			</div>
		</Modal>
	);
};
const NewForm = Form.create()(EventForm);

const ModalButton = ({ postEventInfo, error, called, username }) => {
	let [visible, setVis] = useState(false);

	const showModal = () => {
		setVis(true);
	};
	const handleCancel = () => {
		setVis(false);
	};

	return (
		<div>
			<Button type='primary' onClick={showModal}>
				Create event
			</Button>
			<NewForm
				visible={visible}
				onCancel={handleCancel}
				setVis={setVis}
        postEventInfo={postEventInfo}
        called={called}
        error={error}
        username={username}
			/>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		error: state.error,
    called: state.called,
    username: state.username,
	};
};
export default connect(mapStateToProps, { postEventInfo: postEventInfo })(
	ModalButton,
);
