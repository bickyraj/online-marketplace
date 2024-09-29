import React from 'react';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    TimeScale,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    TimeScale,
    Title,
    Tooltip,
    Legend
);

// Define the props interface
interface LineChartProps {
    labels: string[];
    data: number[];
    title: string;
}
// LineChart Component
const LineChart: React.FC<LineChartProps> = ({ labels, data, title }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Purchase Amount',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Valid positions: 'top', 'bottom', 'left', 'right'
            },
            title: {
                display: true,
                text: title,
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'yyyy-MM-dd',
                    },
                    tooltipFormat: 'yyyy-MM-dd',
                },
                title: {
                    display: true,
                    text: 'Date',
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: undefined, // Let Chart.js handle the ticks based on stepSize
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Total Purchase ($)',
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineChart;