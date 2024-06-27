"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

interface ProductSalesBarChartProps {
  data: {
    date: string,
    sales: number
  }[],
  title?: string,
}

const ProductSalesBarChart: React.FC<ProductSalesBarChartProps> = ({ data, title = "Monthly Sales" }) => {
  const labels = data.map((d) => (d.date));
  const sales = data.map((d) => d.sales);
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data: sales,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            color: "black", // Title in black
            font: {
              size: 24,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "black", // X-axis labels in black
            },
            grid: {
              display: false,
            },
          },
          y: {
            ticks: {
              color: "black", // Y-axis labels in black
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)", // Lighter grid lines
            },
          },
        },
      }}
    />
  );
};

export default ProductSalesBarChart;
