import React from 'react';
import { ModalForm, ProFormText, ProForm, ProFormSelect, ProFormDigit } from '@ant-design/pro-components';
import { listDomains } from '@/services/steins-admin/systemDomainController';
// import { listDomainInfo } from '@/services/steins-admin/systemDomainController';
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
export default function AddSystemUserModal({ modalOpen, handleModalOpen, onSubmit }: ModalProps) {
  return (
    <ModalForm
      title="添加用户"
      width="70%"
      open={modalOpen}
      onOpenChange={handleModalOpen}
      onFinish={onSubmit}
      initialValues={{
        safeLevel: 0
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          <ProForm.Group>
            <ProFormSelect
              label="域"
              rules={requireRules}
              width="md"
              name="domainId"
              request={async () => {
                const resp = await listDomains({});
           
                return (
                  resp.data?.map((it) => ({
                    label: it.domain_name,
                    value: it.domain_id,
                  })) || []
                );
              }}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              width="md"
              name="account"
              label="账号"
              tooltip=""
              placeholder="请输入账号"
              rules={requireRules}
            ></ProFormText>
            <ProFormText.Password
              width="md"
              name="password"
              label="密码"
              tooltip=""
              placeholder="请输入密码"
              rules={requireRules}
            ></ProFormText.Password>
          </ProForm.Group>

          <ProForm.Group>
            <ProFormText
              width="md"
              name="nickname"
              label="昵称"
              tooltip=""
              placeholder="请输入昵称"
              rules={requireRules}
            ></ProFormText>
            <ProFormSelect
              label="是否为管理员"
              tooltip="如果是管理员账号，则可以通过此账号登录管理端"
              rules={requireRules}
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

        </div>
      </div>
    </ModalForm>
  );
}
