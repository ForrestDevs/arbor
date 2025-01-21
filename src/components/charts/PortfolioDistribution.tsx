import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PortfolioDistributionProps {
  data: {
    tokens: string[];
    values: number[];
  };
}

export function PortfolioDistribution({ data }: PortfolioDistributionProps) {
  const chartData = {
    labels: data.tokens,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Portfolio Distribution",
      },
    },
  };

  return (
    <div className="w-full h-[400px] p-4 bg-white rounded-lg shadow">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}
