import React, { useState, useEffect } from 'react'
import { ModalForm, ProFormText, ProForm, ProFormSelect } from '@ant-design/pro-components';
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
            title='更新组信息'
            width="50%"
            open={modalOpen}
            onOpenChange={handleModalOpen}
            onFinish={onSubmit}
            initialValues={values}
        >
            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="groupName"
                    label="组名称"
                ></ProFormText>
               
            </ProForm.Group>
        </ModalForm>
    )
}
