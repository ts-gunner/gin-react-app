import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import UserTable from './UserTable'
const tabList = [
    {
        tab: '管理端用户',
        key: 'admin_users',
        component: <UserTable isAdmin={true}/>
    },
    {
        tab: '客户端用户',
        key: 'app_users',
        component: <UserTable isAdmin={false}/>
    },
]
export default function UserManagePage() {
    const [tabKey, setTabKey] = useState(tabList[0].key)
    return (
        <PageContainer
            loading={false}
    
            tabList={tabList}
            onTabChange={(key: string) => setTabKey(key)}
        >
            {tabList.find(tab => tab.key === tabKey)?.component}
        </PageContainer>
    )
}
