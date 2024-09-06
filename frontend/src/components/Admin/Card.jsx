import React from 'react'

function Card(props) {
  return (
    <div className='shadow min-h-screen rounded'>
      {props.children}
    </div>
  )
}

export default Card
