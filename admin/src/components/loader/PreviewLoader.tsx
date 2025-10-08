"use client"
import React from 'react'
import "./loader.css"
import PDFLoader from './PDFLoader';

import ImageLoader from './ImageLoader';
// @ts-ignore
import DocLoader from './DocLoader';
// @ts-ignore
import ExcelLoader from "./ExcelLoader"

export const PREVIEW_IMAGE_EXTENSION = ["jpg", "jpeg", "png"]  // 预览图片支持的后缀

export const PREVIEW_PDF_EXTENSION = ["pdf"]  // 预览PDF支持的后缀

export const PREVIEW_DOC_EXTENSION = ["docx"]  // 预览DOC支持的后缀

export const PREVIEW_EXCEL_EXTENSION = ["xlsx", "xls"]  // 预览DOC支持的后缀

export const PREVIEW_ALLOW_EXTENSION = [
    ...PREVIEW_PDF_EXTENSION, ...PREVIEW_EXCEL_EXTENSION, ...PREVIEW_IMAGE_EXTENSION, ...PREVIEW_DOC_EXTENSION
]

export const ALLOW_UPLOAD_EXTENSION = ["pdf", "docx", "xlsx"]  // 允许上传的后缀
export default function PreviewLoader({ fileUrl }: {
  fileUrl: string,
}) {
  const extension = fileUrl ? fileUrl.toLowerCase().split(".")[fileUrl.toLowerCase().split(".").length - 1] : ""
  return (
    <div className='h-full w-full'>
      {
        PREVIEW_PDF_EXTENSION.includes(extension) && <PDFLoader url={fileUrl} />
      }
      {
        PREVIEW_IMAGE_EXTENSION.includes(extension) && <ImageLoader url={fileUrl} />
      }
      {
        PREVIEW_DOC_EXTENSION.includes(extension) && <DocLoader url={fileUrl} />
      }
      {
        PREVIEW_EXCEL_EXTENSION.includes(extension) && <ExcelLoader url={fileUrl} />
      }
      {
        !PREVIEW_ALLOW_EXTENSION.includes(extension) && (
          <div className='h-full w-full flex items-center justify-center'>暂不支持预览{extension}格式的文件</div>
        )
      }
    </div>

  )
}
