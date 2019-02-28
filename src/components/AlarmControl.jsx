
import React from 'react';
import { func, string } from 'prop-types';
import IconButton from './IconButton';

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

export default AlarmControl;
