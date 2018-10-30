import React, { Suspense } from 'react';
import Now from './Now';

export default () => (
  <Suspense delayMs={5000} fallback={null}>
    <Now />
  </Suspense>
);
