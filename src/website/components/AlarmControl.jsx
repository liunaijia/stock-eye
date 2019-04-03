
import React, { useContext } from 'react';
import { func, string } from 'prop-types';
import IconButton from './IconButton';
import { StoreContext } from '../contexts';

const AlarmControl = ({ status, onChange }) => {
  const handleClick = () => {
    const toggledStatus = status === 'on' ? 'off' : 'on';
    if (onChange) {
      onChange({ target: { value: toggledStatus } });
    }
  };
  return (
    <IconButton type={status === 'on' ? 'primary' : 'default'} onClick={handleClick}>
      {`alarm_${status}`}
    </IconButton>
  );
};

AlarmControl.propTypes = {
  onChange: func,
  status: string,
};

AlarmControl.defaultProps = {
  onChange: undefined,
  status: 'on',
};

const WithContext = () => {
  const { alarm } = useContext(StoreContext);
  return (
    <AlarmControl
      status={alarm.status}
      onChange={e => alarm.setStatus(e.target.value)}
    />
  );
};

export default WithContext;
