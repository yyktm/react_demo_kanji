import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import "chart.js/auto"

function DoughnutChart(props) {
    const doughnutData = {
        labels: ['正解', '不正解'],
        datasets: [
            {
                data: props.scoreData,
                backgroundColor: [
                    'rgba(56, 178, 172, 0.8)',
                    'rgba(245, 101, 101, 0.8)'
                ],
                borderWidth: 0,
            },
        ],
    };

    return <Doughnut data={doughnutData} />;
}

export default DoughnutChart;

