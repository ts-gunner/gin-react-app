import React from 'react'
import FileViewer from "react-file-viewer"
export default function DocLoader({ url }) {
  return (
    <div className='h-full'>
      <FileViewer fileType="docx" filePath={url}></FileViewer>
    </div>
  )
}
