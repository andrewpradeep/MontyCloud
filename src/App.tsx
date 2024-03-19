import { Input, Layout, Menu } from "antd";
import "./App.css";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
    BellTwoTone,
    BugTwoTone,
    DatabaseOutlined,
    DatabaseTwoTone,
    InfoCircleTwoTone,
    LockOutlined,
    SearchOutlined,
    StockOutlined,
} from "@ant-design/icons";
import InfoWidget from "./Components/Common/InfoWidget";

import MPieChart from "./Components/Charts/MPieChart";
import ResourceList from "./Components/Widgets/ResourceList";

import { useEffect } from "react";
import RoundedLogo from "./Components/Common/RounedLogo";
import PersonalLogo from "./assets/personalLogo.svg";

import {
    INotification,
    NotificationType,
} from "./Components/Common/NotificationList/interface";
import useNotification from "./utils/Hooks/Notification";
import MAreaChart from "./Components/Charts/MAreaChart";
import { NotificationMockData } from "./utils/MockData";

function App() {
    const NotificationApi = useNotification();

    useEffect(() => {
        const interval = setInterval(() => {
            const types = Object.values(NotificationType);
            const type = types[Math.floor(Math.random() * types.length)];
            const closable = !!Math.floor(Math.random() * 2);
            const content =
                NotificationMockData[
                    Math.floor(Math.random() * NotificationMockData.length)
                ].content;
            const notification1: INotification = {
                id: Date.now().toString(36),
                message: content,
                type,
                closable,
                timer: Math.floor(Math.random() * 2) || !closable ? 8 : 0,
                read: false,
            };
            NotificationApi.push(notification1);
        }, 6000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <Layout className="parent-layout">
                <Header className="p-4 flex">
                    <RoundedLogo
                        logoUrl={PersonalLogo}
                        alt="Andrew Pradeep Logo"
                        className="w-12 h-12 mt-2 ml-12"
                    />

                    <Input
                        className=" ml-96 w-96 border-0"
                        placeholder="search"
                        prefix={<SearchOutlined className="p-0.5" />}
                    />
                </Header>

                <Layout className="grow">
                    <Sider width={250} className="white-sider">
                        <Menu
                            className="side-menu"
                            mode="inline"
                            defaultSelectedKeys={["1"]}
                            items={[
                                {
                                    key: "1",
                                    icon: <StockOutlined />,
                                    label: "Metrics",
                                },
                                {
                                    key: "2",
                                    icon: <DatabaseOutlined />,
                                    label: "Volumes",
                                },
                                {
                                    key: "3",
                                    icon: <LockOutlined />,
                                    label: "Network and security",
                                },
                            ]}
                        />
                    </Sider>
                    <Content className="h-full p-6">
                        <div className="flex justify-between flex-wrap gap-4">
                            <InfoWidget
                                icon={
                                    <DatabaseTwoTone
                                        style={{ fontSize: "1.5rem" }}
                                    />
                                }
                                info={"56"}
                                category="Servers"
                            />

                            <InfoWidget
                                icon={
                                    <InfoCircleTwoTone
                                        style={{ fontSize: "1.5rem" }}
                                    />
                                }
                                info={"121"}
                                category="Info"
                            />

                            <InfoWidget
                                icon={
                                    <BugTwoTone
                                        style={{ fontSize: "1.5rem" }}
                                    />
                                }
                                info={"6"}
                                category="Failures"
                            />

                            <InfoWidget
                                icon={
                                    <BellTwoTone
                                        style={{ fontSize: "1.5rem" }}
                                    />
                                }
                                info={"47"}
                                category="WebHooks"
                            />
                        </div>

                        <div className="flex justify-between w-full  mt-6 flex-wrap gap-4">
                            <div className="bg-white rounded-lg grow">
                                <MAreaChart />
                            </div>
                            <div
                                className="bg-white rounded-lg ml-2"
                                style={{ width: "35%" }}
                            >
                                <MPieChart />
                            </div>
                        </div>

                        <div className="flex mt-6 w-full flex-wrap gap-4">
                            <ResourceList />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export default App;
