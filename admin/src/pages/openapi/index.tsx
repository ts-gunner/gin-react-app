import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Typography, Table, Button, Modal, Input, message } from 'antd';
import { RefreshCcw, Trash2 } from 'lucide-react';
import type { TableProps } from 'antd';
import copy from 'copy-to-clipboard';
import { createKey, getApiKeys, removeApiKey } from '@/services/steins-admin/apiManageController';
export default function OpenApiPage() {
  const [createKeyModalOpen, setCreateKeyModalOpen] = useState<boolean>(false);
  const [apiName, setApiName] = useState<string>('');
  const [step, setStep] = useState<number>(0);
  const [apiKey, setApiKey] = useState<string>('');
  const [tableData, setTableData] = useState<API.SystemSecretInfo[]>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const refresh = async () => {
    let result = true;
    setTableLoading(true);
    const resp = await getApiKeys();
    if (resp.code === 200) {
      setTableData(resp.data);
    } else {
      message.error(resp.msg);
      result = false;
    }
    setTableLoading(false);
    return result;
  };
  useEffect(() => {
    refresh();
  }, []);
  const columns: TableProps['columns'] = [
    {
      key: 'apiName',
      title: '名称',
      dataIndex: 'apiName',
      align: 'center',
    },
    {
      key: 'apiKey',
      title: 'Key',
      dataIndex: 'apiKey',
      align: 'center',
    },
    {
      key: 'createTime',
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      key: 'action',
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      render: (_, record) => {
        return (
          <div className="flex justify-center items-center">
            <Trash2
              className="h-5 w-5"
              onClick={async () => {
                const resp = await removeApiKey({
                  api_id: record.id,
                });
                if (resp.code === 200) {
                  message.success('删除成功');
                  await refresh();
                } else {
                  message.error('删除失败：' + resp.msg);
                }
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold">API Keys</div>
        <RefreshCcw
          className="h-4 w-4"
          onClick={async () => {
            let result = await refresh();
            if (result) {
              message.success('刷新成功！');
            }
          }}
        />
      </div>

      <div className="mt-10 flex flex-col gap-6">
        <Typography>
          列表内是你的全部 API key，API key 仅在创建时可见可复制，请妥善保存。
        </Typography>
        <div className="">
          <Table columns={columns} loading={tableLoading} dataSource={tableData}></Table>
        </div>

        <div>
          <Button type="primary" onClick={() => setCreateKeyModalOpen(true)}>
            创建 API Key
          </Button>
        </div>
      </div>

      <Modal
        title="创建API Key"
        open={createKeyModalOpen}
        onCancel={() => setCreateKeyModalOpen(false)}
        okText={step === 0 ? '创建' : '复制'}
        onOk={async () => {
          if (step === 0) {
            const resp = await createKey({
              api_name: apiName,
            });
            if (resp.code === 200) {
              message.success('创建成功');
              setApiKey(resp.data);
              setApiName("")
              setStep(1);
            } else {
              message.error('创建失败');
            }
          } else if (step === 1) {
            copy(apiKey);
            message.success('复制成功');
            setStep(0)
            setCreateKeyModalOpen(false);
            setApiKey('');
            await refresh();
          }
        }}
      >
        {step === 0 && (
          <div>
            <label>名称</label>
            <Input
              placeholder="输入API Key的名称"
              value={apiName}
              onChange={(e) => setApiName(e.target.value)}
            ></Input>
          </div>
        )}
        {step === 1 && (
          <div className="w-full">
            <div>
              请将此API Key保存在安全且易于访问的地方。出于安全原因，你将无法通过API
              Keys管理界面再次查看它。 如果你丢失了这个key，将需要重新创建。
            </div>
            <div className="border p-2 w-full rounded-xl mt-2">{apiKey}</div>
          </div>
        )}
      </Modal>
    </PageContainer>
  );
}
