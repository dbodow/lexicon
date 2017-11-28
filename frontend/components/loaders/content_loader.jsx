import React from 'react';
import { PulseLoader } from 'react-spinners';

export default () => (
  <div className='content-loader'>
    <PulseLoader
          color={'#123abc'}
          loading={true}
        />
  </div>
);
