import React, { useRef, useState } from 'react'
import { PageContainer, ProTable, ProColumns } from '@ant-design/pro-components'
import type { ActionType } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UpdateModal from './UpdateModal';
import AddModal from './AddModal';
import { addDepartmentInfo, updateDepartmentInfo } from '@/services/steins-admin/systemDepartmentController';
import { addGroupInfo, getGroupInfoPage, updateGroupInfo } from '@/services/steins-admin/systemGroupController';
export default function DepartmentManagePage() {
    const actionRef = useRef<ActionType>();
    const [pageSize, setPageSize] = useState(20);
    const [addModalOpen, handleAddModalOpen] = useState(false)
    const [updateModelOpen, handleUpdateModelOpen] = useState(false)
    const [currentData, setCurrentData] = useState<API.SystemGroupPageVo>({})
    const columns: ProColumns<API.SystemGroupPageVo>[] = [

        {
            key: "groupName",
            title: '组名称',
            dataIndex: 'groupName',
            align: "center",
        },
        {
            key: "deptName",
            title: '所属部门',
            dataIndex: 'deptName',
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
                <div className='flex items-center gap-4 justify-center'>
            
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
            <ProTable<API.SystemGroupPageVo, API.GetGroupPageRequest>
                headerTitle='组列表'
                actionRef={actionRef}
                rowKey="groupId"
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
                            handleAddModalOpen(true);
                        }}
                    >
                        <PlusOutlined /> 新建
                    </Button>,
                ]}
                request={
                    async (params) => {
                        const response = await getGroupInfoPage({
                            currentPage: params.current,
                            pageSize: params.pageSize,
                            groupName: params.groupName,
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
                    console.log(currentData, values)
                    const resp = await addGroupInfo({
                        deptId: values.deptId,
                        groupName: values.groupName
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
                    const resp = await updateGroupInfo({
                        groupId: currentData.groupId,
                        groupName: values.groupName
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
