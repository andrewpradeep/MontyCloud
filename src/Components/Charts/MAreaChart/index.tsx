import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";
import { CpuSpikeData } from "../../../utils/MockData";
import MPieChart from "../MPieChart";

const MAreaChart = () => {
    return (
        <div className=" p-6 ">
            <AreaChart
                width={630}
                height={250}
                data={CpuSpikeData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#fa9802"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#fa9802"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="timestamp"
                    minTickGap={10}
                    ticks={[
                        "12:00 AM",
                        "1:00 AM",

                        "3:00 AM",
                        "6:00 AM",
                        "8:00 AM",
                        "10:00 AM",
                        "11:00 AM",
                        "12:00 PM",
                    ]}
                />
                <YAxis />

                <Tooltip
                    formatter={(value, name, props) => {
                        return [`${value}%`, "CPU usage"];
                    }}
                />

                <Area
                    type="monotone"
                    dataKey="usage_percent"
                    stroke="#fa9802"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                />
            </AreaChart>
            <MPieChart />
        </div>
    );
};

export default MAreaChart;
