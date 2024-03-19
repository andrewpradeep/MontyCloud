import { Typography, theme } from "antd";
import "./index.css";

export interface InfoWidgetProps {
    icon: React.ReactNode;
    iconBackground?: string;
    options?: React.ReactNode;
    info: string;
    category: string;
}

const InfoWidget: React.FC<InfoWidgetProps> = ({
    icon,
    iconBackground,
    options,
    info,
    category,
}) => {
    const {
        token: { colorInfoBg },
    } = theme.useToken();
    return (
        <div className="info-widget">
            <div className="">{options}</div>
            <div className="flex">
                <div
                    className="info-icon"
                    style={{ background: iconBackground ?? colorInfoBg }}
                >
                    {icon}
                </div>
                <div className="flex flex-col grow ml-2">
                    <Typography.Title level={5} className="info-detail">
                        {info}
                    </Typography.Title>
                    <Typography.Text>{category}</Typography.Text>
                </div>
            </div>
        </div>
    );
};

export default InfoWidget;
