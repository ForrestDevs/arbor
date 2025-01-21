import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PnLChartProps {
  data: {
    dates: string[];
    profits: number[];
    losses: number[];
  };
}

export function PnLChart({ data }: PnLChartProps) {
  const chartData = {
    labels: data.dates,
    datasets: [
      {
        label: "Profit",
        data: data.profits,
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
      {
        label: "Loss",
        data: data.losses,
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Profit and Loss Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-[400px] p-4 bg-white rounded-lg shadow">
      <Bar data={chartData} options={options} />
    </div>
  );
}
