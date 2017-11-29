import React from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';

export default ({list}) => (
  <div className='list-index-item'>
    <div  className='list-index-item-title'>
      <h4>
        <Truncate lines={2} ellipsis='...'>
          {list.title}
        </Truncate>
      </h4>
    </div>
    <div className='list-index-item-description'>
      <Truncate lines={4} ellipsis='...'>
        {list.description}
      </Truncate>
    </div>
    <div className='list-index-item-word-count'>
      <Link to={`/lists/${list.id}`}>
        {list.words.length}&nbsp;Words&nbsp;
        <i className="fa fa-chevron-right" aria-hidden="true"/>
      </Link>
    </div>
  </div>
);
