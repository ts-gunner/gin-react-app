import React from 'react'
import { ModalForm, ProFormText, ProForm, ProFormSelect } from '@ant-design/pro-components';
type ModalProps = {
    modalOpen: boolean,
    handleModalOpen: any
    onSubmit: any
}

const requireRules = [
    {
        required: true,
        message: '为必填项',
    },
]
export default function AddDomainModal({ modalOpen, handleModalOpen, onSubmit }: ModalProps) {
    return (
        <ModalForm
            title='添加域'
            width="50%"
            open={modalOpen}
            onOpenChange={handleModalOpen}
            onFinish={onSubmit}
        >

            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <div>
                    <ProForm.Group>
                        <ProFormText
                            width="md"
                            name="domain_name"
                            label="域名"
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
