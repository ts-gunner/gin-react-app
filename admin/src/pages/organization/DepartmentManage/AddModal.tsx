import { ModalForm, ProFormText, ProForm, ProFormSelect } from '@ant-design/pro-components';
import { listDomainInfo } from '@/services/steins-admin/systemDomainController';
import React, { useState, useEffect, useRef } from 'react'
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

    const handleSubmit = async (values: any) => {
        await onSubmit(values);
        // 提交成功后重置表单
        (modalRef.current as any).resetFields();
    };
    return (
        <ModalForm
            key={key}
            formRef={modalRef}
            title='创建新部门'
            width="50%"
            open={modalOpen}
            onOpenChange={handleModalOpen}
            onFinish={handleSubmit}
            initialValues={{
                domainId: values.domainId
            }}
        >

            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <div>
                    <ProForm.Group>
                        <ProFormSelect
                            label="域"
                            rules={requireRules}
                            width="md"
                            name="domainId"
                            request={async () => {
                                const resp = await listDomainInfo({})
                                return resp.data?.map(it => ({
                                    label: it.domainName,
                                    value: it.domainId
                                })) || []
                            }}

                        />
                        <ProFormText
                            width="md"
                            name="deptName"
                            label="部门名称"
                            tooltip=""
                            placeholder="请输入域名称"
                            rules={requireRules}
                        ></ProFormText>

                    </ProForm.Group>

                </div>
            </div>


        </ModalForm>
    )
}
