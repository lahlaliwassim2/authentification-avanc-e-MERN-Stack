import React from 'react'
import NotFound from '../../assets/img/404.svg'
import "./NotFoundScreen.css"

function NotFoundScreen() {
  return (
    <div className='notFound'>
      <img src= {NotFound}  alt=""/>
    </div>
 )
}

export default NotFoundScreen