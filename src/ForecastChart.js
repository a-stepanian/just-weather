import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import styled from "styled-components";
Chart.register(...registerables);

const ForecastChart = ({ weatherForecast }) => {
  const hourlyTempData = [
    ...weatherForecast[0].hourlyTemp,
    ...weatherForecast[1].hourlyTemp,
    ...weatherForecast[2].hourlyTemp,
  ];

  const hourlyData = {
    labels: hourlyTempData.map((data) => data.time),
    datasets: [
      {
        label: "Temperature (F)",
        data: hourlyTempData.map((data) => data.temp_f),
      },
    ],
  };

  return (
    <Wrapper>
      <h1>chart</h1>
      <Line data={hourlyData} className="chart" />
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default ForecastChart;
