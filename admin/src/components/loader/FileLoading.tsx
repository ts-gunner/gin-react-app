import React from 'react'
import "./file-loading.css"
export default function FileLoading({ text }: { text?: string }) {
    return (
        <div className="spinner">
            <div className="spinnerin"></div>
        </div>
       
    )
}
