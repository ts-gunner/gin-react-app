import React from 'react'
import { PageContainer } from '@ant-design/pro-components'
import { Typography, Statistic} from "antd";
import MyCharts from '@/components/charts/MyCharts';
import "./index.less"
import { useModel } from '@umijs/max';
import { ICONS } from '@/constants/config';
export default function Dashboard() {
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      <div className='bg-white rounded-xl py-7 px-7 flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <div className=' rounded-xl'>
            <img src={ICONS.animal} className='h-10 w-10'></img>
          </div>
          <div className='flex flex-col gap-1'>
            <Typography.Text strong>早安，{initialState?.loginUser?.nickname}，今天又是心情愉悦的一天！</Typography.Text>
            <Typography.Text type='secondary'>今日您有三个待办，请查看</Typography.Text>
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <div className="flex flex-col items-center">
            <Typography.Text type='secondary'>订单数</Typography.Text>
            <Typography.Text strong={true} className='text-xl'>25</Typography.Text>
          </div>
          <div className="flex flex-col items-center">
            <Typography.Text type='secondary'>待办</Typography.Text>
            <Typography.Text strong={true} className='text-xl'>4/16</Typography.Text>
          </div>

        </div>
      </div>
      <div className='grid grid-flow-col gap-2 items-center py-2'>

        <div className="dashboard-data-card" style={{ backgroundColor: "#d04f96" }}>
          <Typography.Text style={{ color: "white" }}>访问量</Typography.Text>
          <div className='flex items-center justify-between'>
            <img src={ICONS.access_count} className='h-6 w-6' />
            <Statistic value="9725" valueStyle={{ color: "white" }}></Statistic>
          </div>
        </div>

        <div className="dashboard-data-card" style={{ backgroundColor: "#61bbed" }}>
          <Typography.Text style={{ color: "white" }}>成交额</Typography.Text>
          <div className='flex items-center justify-between'>
          <img src={ICONS.access_count} className='h-6 w-6' />
            <Statistic value="9725" valueStyle={{ color: "white" }}></Statistic>
          </div>
        </div>
        <div className="dashboard-data-card" style={{ backgroundColor: "#faa33e" }}>
          <Typography.Text style={{ color: "white" }}>下载量</Typography.Text>
          <div className='flex items-center justify-between'>
          <img src={ICONS.access_count} className='h-6 w-6' />
            <Statistic value="9725" valueStyle={{ color: "white" }}></Statistic>
          </div>
        </div>
        <div className="dashboard-data-card" style={{ backgroundColor: "#664eb9" }}>
          <Typography.Text style={{ color: "white" }}>成交量</Typography.Text>
          <div className='flex items-center justify-between'>
          <img src={ICONS.access_count} className='h-6 w-6' />
            <Statistic value="9725" valueStyle={{ color: "white" }}></Statistic>
          </div>
        </div>
      </div>
        
      <div className="dashboard-common-box">
      <MyCharts />
      </div>
    

      <div style={{
        display: "flex",
        gap: "1rem"
      }}>
        <div className="dashboard-common-box" style={{ flex: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography.Text>项目动态</Typography.Text>
            <Typography.Text>更多动态</Typography.Text>
          </div>
          <hr></hr>
          
          <div style={{ height: "300px" }}></div>
        </div>
        <div className="dashboard-common-box" style={{ flex: 4 }}>
        
        </div>
      </div>
    </PageContainer>
  )
}
