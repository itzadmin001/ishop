import React from 'react'

function Container(props) {
  return (
    <div className={`max-w-[1200px] mx-auto ${props.classes}`}>
      {props.children}
    </div>
  )
}

export default Container
