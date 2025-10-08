import React from 'react'

export default function ImageLoader({url}: {url:string}) {
  return (
    <div>
      <img src={url} className='h-full w-full'/>
    </div>
  )
}
