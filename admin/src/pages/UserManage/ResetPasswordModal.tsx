import React, { useState, useEffect } from 'react'
import { ModalForm, ProFormText, ProForm, ProFormSelect } from '@ant-design/pro-components';
type ModalProps = {
    modalOpen: boolean,
    handleModalOpen: any
    onSubmit: any
    values: any
}


export default function ResetPasswordModal({ modalOpen, handleModalOpen, onSubmit, values }: ModalProps) {
    const [key, setKey] = useState(0)
    useEffect(() => {
        setKey(key + 1)
    }, [values])

    return (
        <ModalForm
            key={key}
            title='重置密码'
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
                    <div>
                        当前重置
                        <text className='font-bold'>{values.nickname}</text>
                        的密码
                    </div>
                    <ProForm.Group>
                        <ProFormText.Password
                            width="md"
                            name="password"
                            label="密码"
                            tooltip=""
                            placeholder="请输入密码"
                        ></ProFormText.Password>
                    </ProForm.Group>

                </div>
            </div>


        </ModalForm>
    )
}
