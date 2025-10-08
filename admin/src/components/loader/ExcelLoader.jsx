"use client"
import React, { useState, useEffect } from 'react';
import FileLoading from './FileLoading';
import * as XLSX from 'xlsx';

const ExcelLoader = ({ url }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [maxColumnCount, setMaxColumnCount] = useState(0)
    useEffect(() => {
        const fetchAndParseExcel = async () => {
            setLoading(true)

            try {
                // 从 URL 获取 Excel 文件  
                const response = await fetch(url);
                const arrayBuffer = await response.arrayBuffer();

                // 解析 Excel 文件  
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                let maxCol = 0
                for (let row of jsonData){
                    maxCol = Math.max(row.length, maxCol)
                }

                setData(jsonData);
                setMaxColumnCount(maxCol)
            } catch (error) {
                console.error('Error fetching or parsing the Excel file:', error);
            }
            setLoading(false)
        };
        fetchAndParseExcel();
    }, [url]);

    return (
        <div className="h-full shadow-md rounded-lg">
            {loading && (
                <div className='flex justify-center items-center h-full flex-col gap-5'>
                    <FileLoading />
                    <div>加载中</div>
                </div>
            )}
            <table className=" w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {data.length > 0 &&
                            data[0].map((header, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-3"
                                >
                                    {header}
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.slice(1).map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex} className={`hover:bg-gray-50 transition-colors grid gap-2 place-items-center grid-cols-${maxColumnCount}`}>
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className="px-6 py-4 text-sm text-gray-900"
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ExcelLoader;  