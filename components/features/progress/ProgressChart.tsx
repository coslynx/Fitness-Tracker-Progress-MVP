import React from 'react';
import { ProgressEntry } from '@/lib/types/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Use Recharts for charting

interface ProgressChartProps {
  progress: ProgressEntry[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ progress }) => {
  // 1. Data Transformation
  const chartData = progress.map((entry) => ({
    date: entry.date.toLocaleDateString(), // Format date for display
    value: entry.value, // Extract value for charting
  }));

  // 2. Chart Customization
  const chartOptions = {
    width: 600, // Adjust chart width as needed
    height: 300, // Adjust chart height as needed
    margin: {
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    },
  };

  // 3. Error Handling
  if (progress.length === 0) {
    return (
      <div className="text-gray-500">No progress data available yet.</div>
    );
  }

  return (
    <LineChart {...chartOptions} data={chartData}>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid stroke="#f5f5f5" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
};

export default ProgressChart;