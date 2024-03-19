import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import { ServerMockData } from "../../../utils/MockData";

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);

    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    // const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    // const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />

            <text
                x={mx}
                y={my}
                textAnchor={textAnchor}
                fill="#333"
            >{`API ${value}`}</text>
            <text x={mx} y={my} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Hit ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

export default class MPieChart extends PureComponent {
    state = {
        activeIndex: 0,
    };

    onPieEnter = (_: any, index: number) => {
        this.setState({
            activeIndex: index,
        });
    };

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={250} height={250}>
                    <Pie
                        activeIndex={this.state.activeIndex}
                        activeShape={renderActiveShape}
                        data={ServerMockData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="api_processed"
                        onMouseEnter={this.onPieEnter}
                    />
                </PieChart>
            </ResponsiveContainer>
        );
    }
}
