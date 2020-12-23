const chartConfig = {
  type: "line",
  data: {
    labels: [
      "2020-01-22",
      "2020-01-22",
      "2020-01-22",
      "2020-01-22",
      "2020-01-22",
      "2020-01-22",
    ],
    datasets: [
      {
        label: "Global",
        data: [400, 700, 800, 900, 1200, 1500],
        backgroundColor: "rgba(255,0,0,0.6)",
        borderWidth: 0.5,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: "blue",
        fontSize: 18,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: "yellow",
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: "white",
            fontSize: 14,
            stepSize: 1,
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

export default chartConfig;
