import { ModalForm, ProFormText, ProForm } from '@ant-design/pro-components';
import React, { useRef } from 'react';
type ModalProps = {
  modalOpen: boolean;
  handleModalOpen: any;
  onSubmit: any;
};

const requireRules = [
  {
    required: true,
    message: '为必填项',
  },
];
export default function AddDomainModal({ modalOpen, handleModalOpen, onSubmit }: ModalProps) {
  const modalRef = useRef(null);

  return (
    <ModalForm
      formRef={modalRef}
      title="创建角色"
      width="50%"
      open={modalOpen}
      onOpenChange={handleModalOpen}
      onFinish={onSubmit}
    >
      <div>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="roleName"
            label="角色名称"
            tooltip=""
            placeholder="请输入角色名称"
            rules={requireRules}
          ></ProFormText>
          <ProFormText
            width="md"
            name="roleKey"
            label="角色代码"
            tooltip=""
            placeholder="请输入角色代码"
            rules={requireRules}
          ></ProFormText>
          <ProFormText
            width="md"
            name="remark"
            label="备注"
            tooltip=""
            placeholder="请输入备注"
          ></ProFormText>
        </ProForm.Group>
      </div>
    </ModalForm>
  );
}
