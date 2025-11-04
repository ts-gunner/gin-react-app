import React, { useState, useEffect } from 'react';
import {
  ModalForm,
  ProFormText,
  ProForm,
  ProFormSelect,
  ProFormDigit,
} from '@ant-design/pro-components';
type ModalProps = {
  modalOpen: boolean;
  handleModalOpen: any;
  onSubmit: any;
  values: any;
};

export default function ChangeUserModal({
  modalOpen,
  handleModalOpen,
  onSubmit,
  values,
}: ModalProps) {
  const [key, setKey] = useState(0);
  useEffect(() => {
    setKey(key + 1);
  }, [values]);

  return (
    <ModalForm
      key={key}
      title="更新用户信息"
      width="70%"
      open={modalOpen}
      onOpenChange={handleModalOpen}
      onFinish={onSubmit}
      initialValues={values}
    >
      <ProForm.Group>
        <ProFormText width="md" name="account" label="账号" tooltip=""></ProFormText>
        <ProFormText width="md" name="nickname" label="昵称" tooltip=""></ProFormText>
        <ProFormText width="md" name="phone" label="手机号码" tooltip=""></ProFormText>
        <ProFormText width="md" name="email" label="邮箱" tooltip=""></ProFormText>
        <ProFormSelect
          label="是否停用"
          tooltip="停用账号，账号无法使用"
          width="md"
          name="status"
          request={async () => {
            return [
              {
                label: '停用',
                value: 0,
              },
              {
                label: '正常',
                value: 1,
              },
            ];
          }}
        />
        <ProFormSelect
          label="是否为管理员"
          tooltip="如果是管理员账号，则可以通过此账号登录管理端"
          width="md"
          name="isAdmin"
          request={async () => {
            return [
              {
                label: '是',
                value: true,
              },
              {
                label: '否',
                value: false,
              },
            ];
          }}
        />
      </ProForm.Group>
    </ModalForm>
  );
}
