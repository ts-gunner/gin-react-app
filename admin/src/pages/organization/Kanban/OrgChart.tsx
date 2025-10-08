import React, { useLayoutEffect, useEffect, useRef } from 'react';
//@ts-ignore
import { OrgChart } from 'd3-org-chart';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';
type OrgChartComponentType = {
  data: any,
  onNodeClick: any,
}
export const OrgChartComponent = ({
  data, onNodeClick
}: OrgChartComponentType) => {
  const d3Container = useRef(null);
  const chartRef = useRef(new OrgChart());
  const dispatch = useDispatch<Dispatch>()


  // We need to manipulate DOM
  useEffect(() => {
    if (data && d3Container.current) {
      const chart = chartRef.current
        .container(d3Container.current)
        .data(data)
        .nodeId((d:any) => d.nodeId)
        .parentNodeId((d:any) => d.parentNodeId)
        .nodeWidth((d: any) => 200)
        .nodeHeight((d: any) => 80)
        .compactMarginPair((d:any) => 100) // 不同节点之间的宽度
        .neighbourMargin((a:any, b:any) => 20)
        .nodeContent(function (d: any, i: any, arr: any, state: any) {
          let borderColor;
          let bgColor;
          if (d.data.type === "domain") {
            borderColor = "#2196f3"
            bgColor = "#e3f2fd"

          } else if (d.data.type === "department") {
            borderColor = "#4caf50"
            bgColor = "#e8f5e9"

          } else if (d.data.type === "group") {
            borderColor = "#ffc107"
            bgColor = "#fff8e1"
          
          } else if (d.data.type === "user") {
            borderColor = "#9c27b0"
            bgColor = "#f3e5f5"
          }
          return `
            <div style="height:100%;border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); background-color: ${bgColor}; border: 2px solid ${borderColor}; transition: transform 0.2s, box-shadow 0.2s;" 
        onmouseover="this.style.transform='translateY(-5px)';this.style.boxShadow='0 5px 15px rgba(0, 0, 0, 0.2)'" 
        onmouseout="this.style.transform='';this.style.boxShadow='0 2px 5px rgba(0, 0, 0, 0.1)'"
        >
       <div style="font-weight: bold; font-size: 14px; color: #555;">${d.data.name}</div>
   </div>
                         `;
        })
        .onNodeClick((d: any, i: any, arr: any) => {
          onNodeClick(d);
        })
        .render();

        dispatch.orgModel.setChart(chart)
    }
  }, [data, d3Container.current]);

  return (
    <div className='w-full'>
      <div ref={d3Container} />
    </div>
  );
};
