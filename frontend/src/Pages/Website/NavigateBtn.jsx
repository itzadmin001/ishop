import React from 'react'

function NavigateBtn({data}) {
  return (
    <div className='text-zinc-200 py-2 px-1 border-b-2 border-zinc-100 w-24'>
      <button>{data}</button>
    </div>
  )
}

export default NavigateBtn
