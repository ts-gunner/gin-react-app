import React, { useEffect, useRef, useState } from 'react';
import { ProTable, ProColumns } from '@ant-design/pro-components';
import type { ActionType } from '@ant-design/pro-components';
import { Button, message, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  addSystemUser,
  deleteSystemUser,
  getSystemUserPage,
  resetPassword,
  updateUserInfo,
} from '@/services/steins-admin/systemUserController';
import AddSystemUserModal from './AddSystemUserModal';
// @ts-ignore
import CryptoJS from 'crypto-js';
import ChangeUserModal from './ChangeUserModal';
import ResetPasswordModal from './ResetPasswordModal';
import { Popconfirm } from 'antd';

type UserTableType = {
  isAdmin: boolean;
};
export default function UserTable({ isAdmin }: UserTableType) {
  const actionRef = useRef<ActionType>();
  const [pageSize, setPageSize] = useState(20);
  const [addUserModalOpen, handleAddUserModalOpen] = useState(false);
  const [updateUserModalOpen, handleUpdateUserModalOpen] = useState(false);
  const [resetPwdModalOpen, handleResetPwdModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<API.SystemUserPageVo>({});
  useEffect(() => {
    actionRef.current?.reload();
  }, [isAdmin]);
  const columns: ProColumns<API.SystemUserPageVo>[] = [
    {
      key: 'id',
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      key: 'account',
      title: '用户账号',
      dataIndex: 'account',
      align: 'center',
    },
    {
      key: 'nickname',
      title: '用户昵称',
      dataIndex: 'nickname',
      align: 'center',
    },
    {
      key: 'lastIp',
      title: '上一次登录IP',
      dataIndex: 'lastIp',
      align: 'center',
      hideInSearch: true,
    },
    {
      key: 'loginCount',
      title: '登录次数',
      dataIndex: 'loginCount',
      hideInSearch: true,
      align: 'center',
    },
    {
      key: 'phone',
      title: '手机号码',
      dataIndex: 'phone',
      hideInSearch: true,
      align: 'center',
    },
    {
      key: 'email',
      title: '邮箱',
      dataIndex: 'email',
      hideInSearch: true,
      align: 'center',
    },
    {
      key: 'safeLevel',
      title: '安全等级',
      dataIndex: 'safeLevel',
      align: 'center',
      hideInSearch: true,
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      valueEnum: {
        1: {
          text: '正常',
          status: 'Success',
        },
        0: {
          text: '停用',
          status: 'Error',
        },
      },
      render: (_,record) => {
        return record.status === 1 ? <Tag color="success">正常</Tag> : <Tag color="error">停用</Tag>;
      },
    },

    {
      key: 'createTime',
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      key: 'option',
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      width: 150,
      fixed: 'right',
      render: (_, record) => [
        <a
          key="change-data"
          onClick={() => {
            setCurrentUser(record);
            handleUpdateUserModalOpen(true);
          }}
        >
          修改
        </a>,
        <a
          key="reset-password"
          onClick={() => {
            setCurrentUser(record);
            handleResetPwdModalOpen(true);
          }}
        >
          重置密码
        </a>,
        <Popconfirm
          key="remove-user"
          title="删除用户"
          description="是否确认删除该用户?"
          onConfirm={async () => {
            const resp = await deleteSystemUser({ userId: record.uid as string });
            if (resp.code === 200) {
              message.success('删除成功');
            } else {
              message.error(resp.msg);
            }
            actionRef.current?.reload();
          }}
          // onCancel={cancel}
          okText="确定"
          cancelText="取消"
        >
          <a key="reset-password">删除</a>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <div>
      <ProTable<API.SystemUserPageVo, API.SystemUserPageRequest>
        headerTitle="用户列表"
        actionRef={actionRef}
        rowKey="uid"
        search={{
          labelWidth: 120,
        }}
        pagination={{
          pageSize: pageSize, // 默认每页显示数量
          pageSizeOptions: ['10', '20', '50', '100'], // 可选的每页显示数量
          showSizeChanger: true, // 显示分页大小选择器
          onShowSizeChange: (current, size) => {
            setPageSize(size);
          },
        }}
        columns={columns}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleAddUserModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params) => {
          const response = await getSystemUserPage({
            currentPage: params.current,
            pageSize: params.pageSize,
            account: params.account,
            nickname: params.nickname,
            isAdmin: isAdmin,
            status: params.status,
          });
          return {
            data: response.data?.records,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: response.code === 200,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: response.data?.total,
          };
        }}
      />

      <AddSystemUserModal
        modalOpen={addUserModalOpen}
        handleModalOpen={handleAddUserModalOpen}
        onSubmit={async (values: any) => {
          const resp = await addSystemUser({
            username: values.account,
            password: CryptoJS.MD5(values.password).toString(),
            nickname: values.nickname,
            isAdmin: values.isAdmin,
            domainId: values.domainId,
            safeLevel: values.safeLevel,
          });
          if (resp.code === 200) {
            message.success('添加成功！');
          }
          handleAddUserModalOpen(false);
          actionRef.current?.reload();
        }}
      />
      <ChangeUserModal
        modalOpen={updateUserModalOpen}
        handleModalOpen={handleUpdateUserModalOpen}
        onSubmit={async (values: any) => {
          const resp = await updateUserInfo({
            userId: currentUser.uid,
            ...values,
          });
          if (resp.code === 200) {
            message.success('修改成功！');
            actionRef.current?.reload();
          } else {
            message.error(resp.msg);
          }
          handleUpdateUserModalOpen(false);
        }}
        values={currentUser}
      />
      <ResetPasswordModal
        modalOpen={resetPwdModalOpen}
        handleModalOpen={handleResetPwdModalOpen}
        values={currentUser}
        onSubmit={async (values: any) => {
          const resp = await resetPassword({
            userId: currentUser.uid as string,
            password: CryptoJS.MD5(values.password).toString(),
          });
          if (resp.code === 200) {
            message.success('修改成功');
            actionRef.current?.reload();
          } else {
            message.error(resp.msg);
          }
          handleUpdateUserModalOpen(false);
        }}
      />
    </div>
  );
}
