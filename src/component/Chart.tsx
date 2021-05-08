import React, { useState } from "react";
import { Line } from "react-chartjs-2";

const Chart = (props: any) => {
  const [nowtimes, setNowTimes] = useState<number[]>([]);
  const weatherData = props.data;
  const honlyDatas = weatherData.hourly;
  console.log(honlyDatas);
  if (honlyDatas) {
    let time = [];
    for (let i = 0; i < 7; i++) {
      time.push(new Date(honlyDatas[i].dt * 1000).getHours());
      setNowTimes(time);
    }
  }

  interface Datas {
    labels: string[];
    datasets: [
      {
        label: string;
        backgroundColor: string;
        borderColor: string;
        pointBorderWidth: number;
        data: number[];
      }
    ];
  }

  const data: Datas = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fir", "Sat", "Sun"],
    datasets: [
      {
        label: "Demo line plot",
        backgroundColor: "#008080",
        borderColor: "#7fffd4",
        pointBorderWidth: 10,
        data: [5, 6, 9, 15, 30, 40, 80],
      },
    ],
  };
  return (
    <div>
      <Line type={Line} data={data} />
    </div>
  );
};

export default Chart;
