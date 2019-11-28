import React, { useState } from 'react';
import { Select, Icon, Popconfirm } from 'antd';
import { connect } from 'react-redux';

import { editGuestStatus, deleteGuest } from '../../../actions';

import './GuestCard.scss';

const GuestCard = ({ eventId, editGuestStatus, deleteGuest, guest, createdBy, username }) => {
  const [status, setStatus] = useState(guest.attended);

  const handleChange = (value) => {
    const newStatus = {attended: value};
    setStatus(value);
    editGuestStatus(eventId, guest.username, newStatus)
  }

  const handleConfirm = (e) => {
    deleteGuest(eventId, guest.username)
  }

  const Actions = () => {
    const { Option } = Select;
    return (
    <div>
      <Select
        style={{width: 100}}
        onChange={handleChange}
        defaultValue={status}
      >
        <Option value={true}>Attending</Option>
        <Option value={false}>Flaking</Option>
      </Select>
      <Popconfirm
        icon={ <Icon type="exclamation-circle" style={{ color: 'red' }}/>}
        title="Delete this guest"
        onConfirm={handleConfirm}
        okText="Delete"
        cancelText="Cancel"
      >
        <Icon type="close" className="guest-del"/>
      </Popconfirm>
    </div>
    )
  }

  return (
    <div className="guest-card">
      <p>{guest.full_name} @{guest.username}</p>
      { (createdBy === username || guest.username === username) && (createdBy !== guest.username) ? <Actions /> : guest.attended ? "Attending" : "Flaking" }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    username: state.username
  }
}
export default connect(mapStateToProps, {editGuestStatus: editGuestStatus, deleteGuest: deleteGuest})(GuestCard);