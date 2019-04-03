import { useState } from 'react';

export default () => {
  const [status, setStatus] = useState('on');
  return { status, setStatus };
};
