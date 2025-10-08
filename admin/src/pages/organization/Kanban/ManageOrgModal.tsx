import React, { useEffect, useState } from 'react'
import { Modal, Button, Input } from 'antd';

type ModalProps = {
    modalOpen: boolean,
    handleModalOpen: any
    values: any
}


export default function ManageOrgModal({ modalOpen, handleModalOpen, values }: ModalProps) {
    const [key, setKey] = useState(0)
    useEffect(() => {
        setKey(key + 1)
    }, [values])

    return (
        <Modal
            key={key}
            title='组织管理'
            width="70%"
            open={modalOpen}
            okText="保存"
            onCancel={() => handleModalOpen(false)}
            onOk={() => {

            }}

        >
            <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                    <div>当前节点:</div>
                    <div>{values?.data.name}</div>
                </div>
                <div className='flex gap-2'>
                    <Button>添加部门</Button>
                    <Button>添加组</Button>
                    <Button>添加成员</Button>
                </div>
                <div>
                    <Input  placeholder='请输入名称'/>
                    <Input placeholder=''  />
                </div>
            </div>

        </Modal>
    )
}
