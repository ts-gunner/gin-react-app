import React, { useRef, useState } from 'react'
import { PageContainer, ProTable, ProColumns } from '@ant-design/pro-components'
import type { ActionType } from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UpdateModal from './UpdateModal';
import AddModal from './AddModal';
import { addRoleInfo, deleteRoleInfo, getRoleInfoPage, updateRoleInfo } from '@/services/steins-admin/systemRoleController';
export default function RoleManagePage() {
    const actionRef = useRef<ActionType>();
    const [pageSize, setPageSize] = useState(20);
    const [addModalOpen, handleAddModalOpen] = useState(false)
    const [updateModelOpen, handleUpdateModelOpen] = useState(false)
    const [currentData, setCurrentData] = useState<API.SystemRole>({})
    const columns: ProColumns<API.SystemRole>[] = [

        {
            key: "roleName",
            title: '角色名称',
            dataIndex: 'roleName',
            align: "center",
        },
        {
            key: "roleKey",
            title: '角色代码',
            dataIndex: 'roleKey',
            align: "center",
        },
             {
            key: "remark",
            title: '备注',
            dataIndex: 'remark',
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

                    <Popconfirm
                        title="删除角色"
                        description="是否确认删除该角色?"
                        onConfirm={async () => {
                            const resp = await deleteRoleInfo({ roleId: record.roleId as string })
                            if (resp.code === 200) {
                                message.success("删除成功")
                            } else {
                                message.error(resp.msg)
                            }
                            actionRef.current?.reload()
                        }}
                        // onCancel={cancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <a key="reset-password">
                            删除
                        </a>
                    </Popconfirm>
                </div>

            )
        }
    ]

    return (
        <PageContainer>
            <ProTable<API.SystemRole, API.GetRolePageRequest>
                headerTitle='角色列表'
                actionRef={actionRef}
                rowKey="roleId"
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
                        const response = await getRoleInfoPage({
                            currentPage: params.current,
                            pageSize: params.pageSize,
                            roleName: params.roleName,
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
                    const resp = await addRoleInfo({
                        roleName: values.roleName,
                        roleKey: values.roleKey,
                        remark: values.remark
                    })
                    if (resp.code === 200) {
                        message.success("添加成功！")
                    }
                    handleAddModalOpen(false)
                    actionRef.current?.reload()
                }}

            />
            <UpdateModal
                modalOpen={updateModelOpen}
                handleModalOpen={handleUpdateModelOpen}
                values={currentData}
                onSubmit={async (values: any) => {
                    const resp = await updateRoleInfo({
                        roleId: currentData.roleId,
                        roleName: values.roleName,
                        roleKey: values.roleKey
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
