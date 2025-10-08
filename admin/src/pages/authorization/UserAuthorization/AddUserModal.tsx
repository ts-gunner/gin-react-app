import React, { useEffect, useState } from 'react'
import { ModalForm } from '@ant-design/pro-components';
import { Space, Input, Spin, Button, message, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getUsersByOrgInfo } from '@/services/steins-admin/orgManageController';

// @ts-ignore
import { Scrollbars } from 'react-custom-scrollbars';
import { ICONS } from '@/constants/config';
type ModalProps = {
    modalOpen: boolean,
    handleModalOpen: any
    onSubmit: any
    values: any
}

const requireRules = [
    {
        required: true,
        message: '为必填项',
    },
]
export default function AddUserModal({ modalOpen, handleModalOpen, onSubmit, values }: ModalProps) {
    const [key, setKey] = useState(0)
    const [searchValue, handleSearchValue] = useState<string>("")
    const [dataLoading, setDataLoading] = useState(false)
    const [appendUsers, setAppendUsers] = useState<API.SystemUserVo[]>([])
    const [userList, setUserList] = useState<API.SystemUserVo[]>([])
      const getNotExistsUsers = async (orgId: string, orgType: string) => {
        setDataLoading(true)
        const resp = await getUsersByOrgInfo({
            orgId,
            orgType,
            exists: false
        })
        if (resp.code === 200) {
            if (resp.data?.length === 0) {
                setUserList([])
            } else {
                setUserList(resp.data as API.SystemUserVo[])
            }
        } else {
            message.error(resp.msg)
        }
        setDataLoading(false)
    }
    useEffect(() => {
        setKey(key + 1)
        if (modalOpen && values.label) {
            getNotExistsUsers(values.key, values.targetType)
        }
    }, [values, modalOpen])

  
    const searchInputChange = (event: any) => {
        handleSearchValue(event.target.value)
    }

    const handleOnSubmit = async () => {
        onSubmit(appendUsers)
    }
    return (
        <ModalForm
            key={key}
            title='添加用户'
            width="60%"
            open={modalOpen}
            onOpenChange={handleModalOpen}
            onFinish={handleOnSubmit}
        >

            <div className='flex gap-5 h-[70vh]'>
                <div className='flex-1 flex flex-col gap-2'>
                    <Space.Compact style={{ width: "100%" }}>
                        <Button>
                            <SearchOutlined className='' />
                        </Button>
                        <Input placeholder='输入成员搜索' value={searchValue} onChange={searchInputChange}></Input>
                    </Space.Compact>

                    <Scrollbars>
                        <Spin spinning={dataLoading}>
                            <div className='flex flex-col gap-2'>
                                {
                                    userList.filter(it=> it.nickname?.includes(searchValue)).map(it => (
                                        <div className='py-2 hover:bg-gray-200 rounded-xl flex justify-between items-center px-4' key={it.uid}>
                                            <div className='flex items-center gap-4'>
                                                <img src={ICONS.user} className='h-8 w-8' />
                                                <div>
                                                    {it.nickname}
                                                </div>
                                            </div>
                                            <Tooltip title="添加">
                                                <div onClick={() => {
                                                    if (appendUsers.filter(item => item.uid === it.uid).length > 0) {
                                                        message.error("已在待添加列表中")
                                                        return
                                                    }
                                                    setAppendUsers([...appendUsers, it])
                                                    setUserList(userList.filter(item => item.uid !== it.uid))
                                                }}>
                                                    <img src={ICONS.arrow} className='h-4 w-4' />
                                                </div>
                                            </Tooltip>
                                        </div>

                                    ))
                                }
                            </div>

                        </Spin>
                    </Scrollbars>

                </div>
                <div className='flex-1 p-4 border rounded-xl flex flex-col gap-2'>
                    <div className='text-xl font-bold'>添加列表</div>

                    <Scrollbars>
                        {
                            appendUsers.map((item, index) => (
                                <div className='py-2 hover:bg-gray-200 rounded-xl flex justify-between items-center px-4' key={item.uid}>
                                    <div className='flex items-center gap-4'>
                                        <img src={ICONS.user} className='h-8 w-8' />
                                        <div>
                                            {item.nickname}
                                        </div>
                                    </div>
                                    <Tooltip title="移除">
                                        <div onClick={() => {
                                            setAppendUsers(appendUsers.filter(it => it.uid !== item.uid))
                                            setUserList([...userList, item])
                                        }}>
                                            <img src={ICONS.delete} className='h-4 w-4' />
                                        </div>
                                    </Tooltip>
                                </div>
                            ))
                        }
                    </Scrollbars>
                </div>

            </div>

        </ModalForm>
    )
}
