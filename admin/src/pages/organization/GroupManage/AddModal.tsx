import { ModalForm, ProFormText, ProForm, ProFormSelect } from '@ant-design/pro-components';
import { listDomainInfo } from '@/services/steins-admin/systemDomainController';
import React, { useState, useEffect, useRef } from 'react'
import { listDepartmentInfo } from '@/services/steins-admin/systemDepartmentController';
type ModalProps = {
    modalOpen: boolean,
    handleModalOpen: any
    onSubmit: any
    values: API.SystemDepartmentPageVo
}

const requireRules = [
    {
        required: true,
        message: '为必填项',
    },
]
export default function AddDomainModal({ modalOpen, handleModalOpen, onSubmit, values }: ModalProps) {
    const modalRef = useRef(null)
    const [key, setKey] = useState(0)
    useEffect(() => {
        setKey(key + 1)
    }, [values])

    return (
        <ModalForm
            formRef={modalRef}
            title='创建组'
            width="50%"
            open={modalOpen}
            onOpenChange={handleModalOpen}
            onFinish={onSubmit}
            initialValues={{
                domainId: values.domainId
            }}
        >

            <div >
                    <ProForm.Group>
                        <ProFormSelect
                            label="部门"
                            rules={requireRules}
                            width="md"
                            name="deptId"
                            request={async () => {
                                const resp = await listDepartmentInfo({})
                                return resp.data?.map(it => ({
                                    label: (
                                        <div className='flex gap-2 items-center'>
                                            <div>{it.deptName}</div>
                                             <div className="px-1.5 py-0.5 text-xs font-bold rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">{it.domainName}</div>
                                            </div>
                                    ),
                                    value: it.deptId
                                })) || []
                            }}

                        />
                        <ProFormText
                            width="md"
                            name="groupName"
                            label="组名"
                            tooltip=""
                            placeholder="请输入组名称"
                            rules={requireRules}
                        ></ProFormText>

                    </ProForm.Group>

            </div>


        </ModalForm>
    )
}
