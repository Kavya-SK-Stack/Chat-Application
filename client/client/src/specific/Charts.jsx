import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import { purple, orange } from "../constants/color";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    plugins,
    scales
    
} from "chart.js";
import { getLast7Days } from "../lib/features";

const beginAtZero = true;

const labels = getLast7Days();

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },

    scales: {
        x: {
            grid: {
                display: false,
            },
            // display: false,
        },
        y: {
            beginAtZero,
            grid: {
                display: false,
            },
            // display: false,
        },
    },
};

ChartJS.register(
    LinearScale, PointElement, LineElement, Tooltip, Legend, CategoryScale);

const LineChart = ({value=[]}) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Messages",
        fill: true,
        backgroundColor: "rgba(75,12,192,0.2)",
        borderColor: "rgba(75,12,192,1)",
      },
      
    ],
  };
  return <Line data={data } options={lineChartOptions}/>;
};

const DoughnutChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    cutout: 80,
}

const DoughnutChart = ({value=[], labels=[]}) => {
    const data = {
      labels,
      datasets: [
        {
          data: value,
          label:"Total Chats vs Group Chats",
          backgroundColor: [purple, orange],
              borderColor: "rgba(75,12,192,1)",
          offset:20,
        },
      ],
    };
    return <Doughnut
        style={{
            zIndex: 10}} data={data} options={DoughnutChartOptions}/>;
  
    
};

export { LineChart, DoughnutChart };
