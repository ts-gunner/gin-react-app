import React, { useEffect, useRef, useState } from 'react'
import { PageContainer, ProTable, ProColumns } from '@ant-design/pro-components'
import type { ActionType } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addSystemDomain, getDomainInfoPage, removeDomainInfo, updateDomainInfo } from '@/services/steins-admin/systemDomainController';
import UpdateDomainModal from './UpdateDomainModal';
import AddDomainModal from './AddDomainModal';

export default function DomainManage() {
    const actionRef = useRef<ActionType>();
    const [pageSize, setPageSize] = useState(20);
    const [addDomainModalOpen, handleAddDomainModalOpen] = useState(false)
    const [updateModelOpen, handleUpdateModelOpen] = useState(false)
    const [currentData, setCurrentData] = useState<API.SystemDomain>({})
    const columns: ProColumns<API.SystemDomain>[] = [
        {
            key: "domain_name",
            title: '域名',
            dataIndex: 'domain_name',
            align: "center",
        },
        {
            key: 'option',
            title: '操作',
            dataIndex: 'option',
            valueType: "option",
            align: "center",
            width: 150,
            fixed: "right",
            render: (_, record) => (
                <div className='flex items-center gap-3 justify-center'>
                    <a
                        key="change-data"
                        onClick={() => {
                            setCurrentData(record)
                            handleUpdateModelOpen(true)
                        }}
                    >
                        修改
                    </a>
                    <a
                        key="change-data"
                        onClick={async () => {
                            const resp = await removeDomainInfo({
                                domain_id: record.domain_id
                            })
                            if (resp.code === 200) {
                                message.success("删除成功！")
                            }
                            actionRef.current?.reload()
                        }}
                    >
                        删除
                    </a>
                </div>
            )
        }
    ]
    return (
        <PageContainer>
            <ProTable<API.SystemDomain, API.SystemDomainPageRequest>
                headerTitle='域列表'
                actionRef={actionRef}
                rowKey="domainId"
                search={{
                    labelWidth: 120,
                }}
                pagination={{
                    pageSize: pageSize, // 默认每页显示数量
                    pageSizeOptions: ['5', '10', '20', '50', '100'], // 可选的每页显示数量
                    showSizeChanger: true, // 显示分页大小选择器
                    onShowSizeChange: (current, size) => {
                        setPageSize(size)
                    },
                }}
                columns={columns}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                            handleAddDomainModalOpen(true);
                        }}
                    >
                        <PlusOutlined /> 新建
                    </Button>,
                ]}
                request={
                    async (params) => {
                        const response = await getDomainInfoPage({
                            current: params.current,
                            pageSize: params.pageSize,
                            domain_name: params.domain_name
                        })
                        return {
                            data: response.data?.records,
                            // success 请返回 true，
                            // 不然 table 会停止解析数据，即使有数据
                            success: response.code === 200,
                            // 不传会使用 data 的长度，如果是分页一定要传
                            total: response.data?.total,
                        }
                    }
                }
            />
            <AddDomainModal
                modalOpen={addDomainModalOpen}
                handleModalOpen={handleAddDomainModalOpen}
                onSubmit={async (values: any) => {
                    const resp = await addSystemDomain({
                        domain_name: values.domain_name
                    })
                    if (resp.code === 200) {
                        message.success("添加成功！")
                    }
                    handleAddDomainModalOpen(false)
                    actionRef.current?.reload()
                }}

            />
            <UpdateDomainModal
                modalOpen={updateModelOpen}
                handleModalOpen={handleUpdateModelOpen}
                values={currentData}
                onSubmit={async (values: any) => {
                    const resp = await updateDomainInfo({
                        domain_id: currentData.domain_id,
                        domain_name: values.domain_name
                    })
                    if (resp.code === 200) {
                        message.success("修改成功")
                        actionRef.current?.reload()
                    } else {
                        message.error(resp.msg)
                    }
                    handleUpdateModelOpen(false)
                }}
            />
        </PageContainer>
    )
}
