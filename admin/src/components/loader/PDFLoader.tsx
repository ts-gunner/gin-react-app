"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import {
    ChevronLeft,
    ChevronRight
} from "lucide-react"
import FileLoading from './FileLoading';
pdfjs.GlobalWorkerOptions.workerSrc = `/js/pdf.worker.js`;

const DocumentLoading = () => {
    return (
        <div className='h-full flex justify-center items-center flex-col pt-20 gap-10'>
            <FileLoading />
            <div>加载中...</div>

        </div>
    )
}
export default ({ url }: { url: string }) => {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const onDocumentLoadSuccess = ({ numPages }: { numPages: any }) => {
        setNumPages(numPages);
    };
    useEffect(() => {
        setPageNumber(1)
    }, [url])

    return (
        <div className='h-full flex flex-col'>
            <div className='flex justify-center pt-2 gap-4 mb-2'>

                <button className='flex gap-1 border rounded-xl pr-2 py-1 justify-center items-center hover:bg-[#9c6cf7] hover:text-white' onClick={() => {
                    if (pageNumber >= 2) setPageNumber(pageNumber - 1)
                }}>
                    <ChevronLeft />
                    上一页
                </button>
                <div className='flex items-center'>
                    <div>
                    {pageNumber}

                    </div>
                    <div>/</div>
                    <div>
                        {numPages}
                    </div>
                </div>
                <button className='flex gap-1 border rounded-xl pl-2 py-1 justify-center items-center hover:bg-[#9c6cf7] hover:text-white' onClick={() => {
                    if (pageNumber < numPages) setPageNumber(pageNumber + 1)
                }}>
                    下一页
                    <ChevronRight />
                </button>
            </div>
            <div className=''>
                <Document
                    className="h-full"
                    file={url} // 文件地址
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<DocumentLoading />}
                >
                    <Page
                        scale={3}
                        pageNumber={pageNumber}
                        renderTextLayer={false} // 禁用文本层
                        renderAnnotationLayer={false} // 禁用注释层
                    />
                </Document>
            </div>

        </div>

    );
}
