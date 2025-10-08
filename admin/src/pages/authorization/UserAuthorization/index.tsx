import React, { useEffect, useState } from 'react';
import { Tree, message, Space, Tooltip, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { TreeDataNode, TreeProps } from 'antd';
import {
  authUsersToOrg,
  getUsersByOrgInfo,
  listOrganizationTree,
} from '@/services/steins-admin/orgManageController';
import AddUserModal from './AddUserModal';
// @ts-ignore
import { Scrollbars } from 'react-custom-scrollbars';
import { ICONS } from '@/constants/config';

function handleOrganizationTreeData(nodes: any) {
  return nodes.map((node: any) => {
    const newTitle = (
      <div className="flex items-center gap-2">
        <div>{node.title}</div>
        <div className="px-1.5 py-0.5 text-xs font-bold rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {node.targetType === 'domain' && '域'}
          {node.targetType === 'department' && '部门'}
          {node.targetType === 'group' && '组'}
        </div>
      </div>
    );

    const newNode = {
      ...node,
      label: node.title,
      title: newTitle,
    };

    if (newNode.children) {
      newNode.children = handleOrganizationTreeData(newNode.children);
    }

    return newNode;
  });
}

export default function UserAuthorization() {
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [userList, setUserList] = useState<API.SystemUserVo[]>([]);
  const [currentData, setCurrentData] = useState<any>({});
  const [addUserModalOpen, setAddUserModalOpen] = useState<boolean>(false);
  const getOrganizationTree = async () => {
    const resp = await listOrganizationTree();
    if (resp.code === 200) {
      const tree = handleOrganizationTreeData(resp.data);
      setTreeData(tree);
    }
  };
  useEffect(() => {
    getOrganizationTree();
  }, []);

  const listUsersByOrg = async (key: string, type: string, exists: boolean) => {
    const resp = await getUsersByOrgInfo({
      orgId: key,
      orgType: type,
      exists: exists,
    });
    let users = [] as API.SystemUserVo[];

    if (resp.code === 200) {
      if (resp.data?.length !== 0) {
        users = resp.data as API.SystemUserVo[];
      }
      setUserList(users);
    } else {
      message.error(resp.msg);
    }
    return users;
  };
  const onSelect: TreeProps['onSelect'] = async (selectedKeys, info) => {
    let data: any = { ...info.node };
    const users = await listUsersByOrg(
      info.node.key as string,
      (info.node as any).targetType,
      true,
    );
    data.users = users;
    setCurrentData(data);
  };

  return (
    <>
      <div className="flex gap-3" style={{ height: '80vh' }}>
        <div className="flex-1 bg-white p-4 rounded-xl shadow h-full flex flex-col gap-2">
          <div className="text-xl font-bold mb-5">组织架构</div>
          <Scrollbars>
            <Tree onSelect={onSelect} treeData={treeData} />
          </Scrollbars>
        </div>
        <div className="flex-1 bg-white p-4 rounded-xl shadow flex flex-col gap-2">
          <div className="text-xl font-bold">用户列表</div>
          <div>
            <Space.Compact style={{ width: '100%' }}>
              <Tooltip title="添加用户">
                <Button
                  type="primary"
                  onClick={() => {
                    if (currentData.key) {
                      setAddUserModalOpen(true);
                    } else {
                      message.error('请选择组织架构');
                    }
                  }}
                >
                  <PlusOutlined />
                </Button>
              </Tooltip>
            </Space.Compact>
          </div>
          <Scrollbars>
            <div className="flex flex-col gap-2">
              {userList.map((item) => (
                <div
                  className="p-3 rounded-xl w-full bg-[#f5f4f4] flex items-center gap-3"
                  key={item.uid}
                >
                  <img src={ICONS.user} className="h-8 w-8" />
                  <div>{item.nickname}</div>
                </div>
              ))}
            </div>
          </Scrollbars>
        </div>
      </div>
      <AddUserModal
        modalOpen={addUserModalOpen}
        handleModalOpen={setAddUserModalOpen}
        values={currentData}
        onSubmit={async (values: any) => {
          const resp = await authUsersToOrg({
            orgId: currentData.key,
            orgType: currentData.targetType,
            operateType: 'add',
            userIds: values.map((it: any) => it.uid),
          });
          if (resp.code === 200) {
            message.success(resp.msg);
          } else {
            message.error(resp.msg);
          }
          await listUsersByOrg(currentData.key, currentData.targetType, true);
          setAddUserModalOpen(false);
        }}
      />
    </>
  );
}
