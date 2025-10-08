import React, { useRef, useState } from 'react'
import { PageContainer, ProTable, ProColumns } from '@ant-design/pro-components'
import type { ActionType } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UpdateModal from './UpdateModal';
import AddModal from './AddModal';
import { addDepartmentInfo, getDepartmentInfoPage, updateDepartmentInfo } from '@/services/steins-admin/systemDepartmentController';
export default function DepartmentManagePage() {
    const actionRef = useRef<ActionType>();
    const [pageSize, setPageSize] = useState(20);
    const [addModalOpen, handleAddModalOpen] = useState(false)
    const [updateModelOpen, handleUpdateModelOpen] = useState(false)
    const [currentData, setCurrentData] = useState<API.SystemDepartmentPageVo>({})
    const columns: ProColumns<API.SystemDepartmentPageVo>[] = [

        {
            key: "deptName",
            title: '部门名称',
            dataIndex: 'deptName',
            width: 260
        },
        {
            key: "domainName",
            title: '所属域',
            dataIndex: 'domainName',
            align: "center",
            width: 150
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
                <div className='flex items-center gap-4 justify-center'>
                    <div>
                        <a
                            key="change-data"
                            onClick={() => {
                                setCurrentData(record)
                                handleAddModalOpen(true)
                            }}
                        >
                            新建子部门
                        </a>
                    </div>
                    <div>
                        <a
                            key="change-data"
                            onClick={() => {
                                setCurrentData(record)
                                handleUpdateModelOpen(true)
                            }}
                        >
                            修改
                        </a>
                    </div>
                </div>

            )
        }
    ]

    return (
        <PageContainer>
            <ProTable<API.SystemDepartmentPageVo, API.GetDepartmentRequest>
                headerTitle='部门列表'
                actionRef={actionRef}
                rowKey="deptId"
                search={{
                    labelWidth: 120,
                }}
                pagination={{
                    pageSize: pageSize, // 默认每页显示数量
                    pageSizeOptions: ['10', '20', '50', '100'], // 可选的每页显示数量
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
                            setCurrentData({})
                            handleAddModalOpen(true);
                        }}
                    >
                        <PlusOutlined /> 新建
                    </Button>,
                ]}
                request={
                    async (params) => {
                        const response = await getDepartmentInfoPage({
                            currentPage: params.current,
                            pageSize: params.pageSize,
                            domainName: params.domainName,
                            deptName: params.deptName
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
            <AddModal
                modalOpen={addModalOpen}
                handleModalOpen={handleAddModalOpen}
                onSubmit={async (values: any) => {
                    const resp = await addDepartmentInfo({
                        dpId: currentData.deptId ? currentData.deptId as string: undefined,
                        domainId: values.domainId as string,
                        deptName: values.deptName
                    })
                    if (resp.code === 200) {
                        message.success("添加成功！")
                    }
                    handleAddModalOpen(false)
                    actionRef.current?.reload()
                }}
                values={currentData}

            />
            <UpdateModal
                modalOpen={updateModelOpen}
                handleModalOpen={handleUpdateModelOpen}
                values={currentData}
                onSubmit={async (values: any) => {
                    const resp = await updateDepartmentInfo({
                        deptId: currentData.deptId as string,
                        deptName: values.deptName
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
