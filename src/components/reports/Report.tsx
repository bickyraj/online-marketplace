import React from "react";
import LineChart from "../charts/LineChart.tsx";

const Report: React.FC = () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = [65, 59, 80, 81, 56, 55, 40];
    return (
        <>
            <div className="grid grid-cols-2 gap-10">
                <div>
                    <LineChart labels={labels} data={data} title="Purchase Report" />
                </div>
            </div>
        </>
    );
}

export default Report;