import React, { useState, useEffect } from 'react'
import { ModalForm, ProFormText, ProForm, } from '@ant-design/pro-components';
type ModalProps = {
    modalOpen: boolean,
    handleModalOpen: any
    onSubmit: any
    values: any
}

export default function UpdateDomainModal({ modalOpen, handleModalOpen, onSubmit, values }: ModalProps) {
    const [key, setKey] = useState(0)
    useEffect(() => {
        setKey(key + 1)
    }, [values])

    return (
        <ModalForm
            key={key}
            title='更新角色信息'
            width="50%"
            open={modalOpen}
            onOpenChange={handleModalOpen}
            onFinish={onSubmit}
            initialValues={values}
        >
            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="roleName"
                    label="角色名称"
                    tooltip=""
                    placeholder="请输入角色名称"
                ></ProFormText>
                <ProFormText
                    width="md"
                    name="roleKey"
                    label="角色代码"
                    tooltip=""
                    placeholder="请输入角色代码"
                ></ProFormText>
            </ProForm.Group>
        </ModalForm>
    )
}
