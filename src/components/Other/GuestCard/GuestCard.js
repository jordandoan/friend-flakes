import React, { useState } from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';

import { editGuestStatus } from '../../../actions';

const GuestCard = ({ eventId, editGuestStatus, guest, createdBy, username }) => {
  const [status, setStatus] = useState(guest.attended);

  const handleChange = (value) => {
    const newStatus = {attended: value};
    setStatus(value);
    editGuestStatus(eventId, guest.username, newStatus)
  }

  const Actions = () => {
    const { Option } = Select;
    return (<Select
      style={{width: 100}}
      onChange={handleChange}
      defaultValue={status}
    >
      <Option value={true}>Attending</Option>
      <Option value={false}>Flaking</Option>
    </Select> 
    )
  }

  return (
    <div>
      <p>{guest.full_name} @{guest.username}</p>
      { createdBy == username || guest.username == username ? <Actions /> : ""}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    username: state.username
  }
}
export default connect(mapStateToProps, {editGuestStatus: editGuestStatus})(GuestCard);