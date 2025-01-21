import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TokenPriceChartProps {
  data: {
    timestamps: string[];
    prices: number[];
    token: string;
  };
  timeframe: string;
}

export function TokenPriceChart({ data, timeframe }: TokenPriceChartProps) {
  const chartData = {
    labels: data.timestamps,
    datasets: [
      {
        label: `${data.token} Price`,
        data: data.prices,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
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
        text: `${data.token} Price History (${timeframe})`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="w-full h-[400px] p-4 bg-white rounded-lg shadow">
      <Line data={chartData} options={options} />
    </div>
  );
}
