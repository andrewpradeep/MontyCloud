import { Col, Row, Typography, theme } from "antd";
import "./index.css";

export interface ResourceListProps {
    className?: string;
}
const { useToken } = theme;

const ResourceList: React.FC<ResourceListProps> = ({ className }) => {
    const { token } = useToken();
    return (
        <div className={`w-64 bg-white rounded-lg ${className} `}>
            <div className="resource-header">
                <Typography.Title level={5} className="resource-header-title">
                    Resources
                </Typography.Title>
            </div>
            <Col className="flex flex-col p-6">
                <Row className=" flex justify-between mb-2">
                    <Typography.Text>Instances </Typography.Text>
                    <Typography.Text>20</Typography.Text>
                </Row>
                <Row className="flex justify-between mb-2">
                    <Typography.Text>Instances(running) </Typography.Text>
                    <Typography.Text>11</Typography.Text>
                </Row>
                <Row className="flex justify-between mb-2">
                    <Typography.Text>Load Balancers </Typography.Text>
                    <Typography.Text>3</Typography.Text>
                </Row>
                <Row className="flex justify-between mb-2">
                    <Typography.Text>Security Groups </Typography.Text>
                    <Typography.Text>5</Typography.Text>
                </Row>
                <Row className="flex justify-between mb-2">
                    <Typography.Text>Volumes </Typography.Text>
                    <Typography.Text>12</Typography.Text>
                </Row>
            </Col>
        </div>
    );
};

export default ResourceList;
