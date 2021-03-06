import React, { useState, useEffect } from 'react';
import {
	Form,
	Icon,
	Input,
	Button,
	Modal,
} from 'antd';
import { connect } from 'react-redux';
import { inviteGuests } from '../../../actions';

const GuestForm = props => {
  const { getFieldDecorator, getFieldValue } = props.form;
  const [id, setId] = useState(1);

  const handleSubmit = e => {
		e.preventDefault();
		props.form.validateFields((err, values) => {
			if (!err) {
        props.inviteGuests(props.match.params.event_id, values.names);
        props.setVis(false);
			}
		});
  };
  
  // useEffect(() => {
  //   if (props.called) {
  //     props.setVis(false)
  //   }
  // }, [props.called])
  
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

	getFieldDecorator('keys', { initialValue: [0] });
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
			{keys.length > 1 ? (
				<Icon
					className='dynamic-delete-button'
					type='minus-circle-o'
					onClick={() => remove(k)}
				/>
			) : null}
		</Form.Item>
  ));
  
  return (
    <Modal
      visible={props.visible}
      title='Invite guests to: NAME EVENT'
      okText='Invite'
      onCancel={props.onCancel}
      onOk={e => handleSubmit(e)}
      // confirmLoading={confirmLoading}
    >
      <div className='event-form-container'>
        <Form onSubmit={e => handleSubmit(e)}>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type='dashed' onClick={add}>
              <Icon type='plus' /> Add Guest
            </Button>
          </Form.Item>
          {formItems}
        </Form>
      </div>
    </Modal>
  );
}

const NewGuestForm = Form.create()(GuestForm);

const GuestFormModal = ({ inviteGuests, history, match }) => {
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
        Invite guests
      </Button>
      <NewGuestForm
        visible={visible}
        onCancel={handleCancel}
        setVis={setVis}
        inviteGuests={inviteGuests}
        history={history}
        match={match}
        // called={called}
        // error={error}
        // username={username}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    called: state.called,
    error: state.error
  }
}

export default connect(mapStateToProps, {inviteGuests:inviteGuests})(GuestFormModal);