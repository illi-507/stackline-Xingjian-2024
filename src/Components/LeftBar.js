import React from 'react'
import Tags from './Tags';

function LeftBar(props) {
    const {title, image, subtitle, tags} = props;

  return (
    <div className='leftbar-container'>
        <img src={image} alt="product" width="60%"/>
        <h3>{title}</h3>
        <div className='subtitle'>{subtitle}</div>
        <Tags tags={tags}/>
    </div>
  )
}

export default LeftBar