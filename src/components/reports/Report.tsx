import React, {useEffect, useState} from "react";
import LineChart from "../charts/LineChart.tsx";
import reportStore, {Purchase} from "../../store/ReportStore.ts";
import { observer } from "mobx-react-lite";

interface ChartData {
    labels: string[];
    datasets: number[];
}

interface AggregatedData {
    dates: string[];
    amounts: number[];
}
const Report: React.FC = () => {
    const [chartData, setChartData] = useState<ChartData>();

    const aggregateDataByDate = (data: Purchase[]): AggregatedData => {
        const aggregatedData: { [key: string]: number } = {};

        data.forEach((item) => {
            const date = new Date(item.createdAt).toISOString().split('T')[0];

            if (aggregatedData[date]) {
                aggregatedData[date] += item.amount;
            } else {
                aggregatedData[date] = item.amount;
            }
        });

        const dates = Object.keys(aggregatedData);
        const amounts = Object.values(aggregatedData);

        return { dates, amounts };
    };
    useEffect(() => {
        const fetchReports = async () => {
            await reportStore.getReports();
        }
        fetchReports().then(() => {
            const { dates, amounts } = aggregateDataByDate(reportStore.purchaseReports);
            setChartData({
                labels: dates,
                datasets: amounts
            });
        });
    }, [])
    return (
        <>
            <div className="grid grid-cols-2 gap-10">
                <div>
                    <LineChart labels={chartData?.labels ?? []} data={chartData?.datasets ?? []} title="Purchase Report" />
                </div>
            </div>
        </>
    );
}

export default observer(Report);