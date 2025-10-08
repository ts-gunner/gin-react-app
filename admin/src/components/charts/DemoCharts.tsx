import React from 'react'
import ReactECharts from 'echarts-for-react';  
export default function DemoCharts() {
    const getOption = () => {  
        return {  
            title: {  
                text: 'ECharts 示例'  
            },  
            tooltip: {},  
            xAxis: {  
                data: ['大米', '面粉', '牛奶', '鸡蛋', '面包']  
            },  
            yAxis: {},  
            series: [{  
                name: '销量',  
                type: 'bar',  
                data: [5, 20, 36, 10, 10]  
            }],  
        };  
    };  

    return (  
        <div style={{ width: '100%' }}>  
            <ReactECharts option={getOption()} />  
        </div>  
    );  
}
