import React, { useState, useEffect, useRef } from 'react'
import { OrgChartComponent } from './OrgChart';
import { PageContainer } from '@ant-design/pro-components';
import { getOrganizationInfo } from '@/services/steins-admin/orgManageController';
import { Button, Form, Input, message, Select, Menu } from 'antd';
import ManageOrgModal from './ManageOrgModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { listDomainInfo } from '@/services/steins-admin/systemDomainController';

export default function OrganizationManagePage() {
    const formRef = useRef<any>()
    const [loading, setLoading] = useState<boolean>(false)
    const [orgData, setOrgData] = useState<API.OrganizationVo[]>([]);
    const [currentNode, setCurrentNode] = useState<any>(null)
    const [manageOrgModalOpen, handleManageOrgModalOpen] = useState<boolean>(false)
    const chart = useSelector((state: RootState) => state.orgModel.chart)

    const [selectedDomain, setSelectedDomain] = useState<any>(null)
    const [domains, setDomains] = useState<API.SystemDomain[]>([])
    useEffect(() => {
        getDomainListInfo()
    }, []);

    const getDomainListInfo = async () => {
        const resp = await listDomainInfo({})
        if (resp.code === 200) {
            setDomains(resp.data || [])
            if (resp.data) {
                setSelectedDomain(resp.data[0].domainId)
                await (getOrgData(resp.data[0].domainId as string))
            }
        }

    }
    const getOrgData = async (domainId: string) => {
        setLoading(true)
        const resp = await getOrganizationInfo({
            domainId: domainId ? domainId: selectedDomain
        })
        setOrgData(resp.data || [])
        setLoading(false)
    }

    const searchMemberLocation = async (values: any) => {
        const results = orgData.filter(it => it.name?.includes(values.name) && it.type === values.type)
        console.log(results)
        if (results.length === 0) {
            message.error("找不到对应记录")
        } else {
            let newChart = chart.clearHighlighting()
            for (let result of results) {
                newChart = chart.setUpToTheRootHighlighted(result.nodeId)
            }
            newChart.render().fit()
        }
    }
    const nodeClick = (data: any) => {
        setCurrentNode(data)
        // handleManageOrgModalOpen(true)
    }

    const handleSelectedChange = async (val: any) => {
        setSelectedDomain(val)
        await getOrgData(val)
    }
    return (
        <PageContainer
            loading={loading}>

            <div className='w-full flex justify-center'>
                <div className='grid grid-cols-4 gap-5'>
                    <div className='flex gap-2'>
                        <div className='rounded-xl w-10 shadow' style={{ backgroundColor: '#e3f2fd' }}></div>
                        <div>域</div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='rounded-xl w-10 shadow' style={{ backgroundColor: '#e8f5e9' }}></div>
                        <div>部门</div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='rounded-xl w-10 shadow' style={{ backgroundColor: '#fff8e1' }}></div>
                        <div>组</div>
                    </div>

                    <div className='flex gap-2'>
                        <div className='rounded-xl w-10 shadow' style={{ backgroundColor: '#f3e5f5' }}></div>
                        <div>用户</div>
                    </div>
                </div>

            </div>
            <div className='flex justify-between mt-5'>
                <Form
                    ref={formRef}
                    layout="inline"
                    onFinish={searchMemberLocation}
                    initialValues={{
                        price: {
                            number: 0,
                            currency: 'rmb',
                        },
                    }}
                >
                    <Form.Item label="名称">
                        <Form.Item noStyle name='name'>
                            <Input type="text" style={{ width: 100 }} />
                        </Form.Item>
                        <Form.Item noStyle name='type'>
                            <Select style={{ width: 80, margin: '0 8px' }}>
                                <Select.Option value="domain">域</Select.Option>
                                <Select.Option value="department">部门</Select.Option>
                                <Select.Option value="group">组</Select.Option>
                                <Select.Option value="user">用户</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <div className='flex gap-3'>
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                            <Button onClick={() => {
                                chart.clearHighlighting().fit()
                                formRef.current.resetFields()
                            }} >
                                清除
                            </Button>

                        </div>

                    </Form.Item>
                </Form>
                <Select
                    className="w-full!"
                    value={selectedDomain}
                    style={{ width: 200 }}
                    onChange={handleSelectedChange}
                    options={domains.map(item => ({
                        label: item.domainName,
                        value: item.domainId
                    }))}
                />
            </div>
            <div className='flex gap-2 mt-5'>
                <Button onClick={() => {
                    chart?.clearHighlighting().expandAll().fit()
                }}>全部展开</Button>
                <Button onClick={() => chart?.clearHighlighting().collapseAll().fit()}>全部收起</Button>

            </div>

            <OrgChartComponent
                onNodeClick={nodeClick}
                data={orgData}
            />

            <ManageOrgModal
                modalOpen={manageOrgModalOpen}
                handleModalOpen={handleManageOrgModalOpen}
                values={currentNode}

            />
        </PageContainer>
    )
}
