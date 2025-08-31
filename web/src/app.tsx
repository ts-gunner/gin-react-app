
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store"
import { getPersistor } from "@rematch/persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';

const persistor = getPersistor();
export function rootContainer(container: React.ReactNode) {
    return (
        <PersistGate persistor={persistor}>
            <Provider store={store}>

                <ConfigProvider 
                locale={zhCN}
                theme={{
                    token: {
                        colorPrimary: "#71c4ef"
                    },
                }}>
                    {container}
                </ConfigProvider>

            </Provider>
        </PersistGate>
    )
}