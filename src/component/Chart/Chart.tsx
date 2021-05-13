import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const Chart = (props: any) => {
  const [nowtimes, setNowTimes] = useState<number[]>([]);
  const [temphourly, setTempHourly] = useState<number[]>([]);

  useEffect(() => {
    const weatherData =  props.data;
    const honlyDatas = weatherData.hourly;
    console.log(honlyDatas);
    if (honlyDatas) {
      let timeList = [];
      let temperature = [];
      for (let i = 0; i < 7; i++) {
        timeList.push(new Date(honlyDatas[i].dt * 1000).getHours());
      }
      setNowTimes(timeList);

      for (let i = 0; i < 7; i++) {
        temperature.push(Math.fround(honlyDatas[i].temp - 273.15));
      }
      setTempHourly(temperature);
    }
  }, [props.data]);
  console.log(nowtimes);
  console.log(temphourly);

  interface Datas {
    labels: number[];
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
    labels: [...nowtimes],
    datasets: [
      {
        label: "1時間ごとの気温",
        backgroundColor: "#e6e6e6",
        borderColor: "#2e2d2d",
        pointBorderWidth: 2,
        data: [...temphourly],
      },
    ],
  };

  const  graphOption = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "時刻",
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "平均気温(℃)",
            ticks: {
              stepSize: 1,
              fontColor: "blue",
              fontSize: 14,
            },
          },
        },
      ],
    },
  };
  return (
    <div>
      <Line type={Line} height={50} width={50} data={data} options={graphOption} />
    </div>
  );
};

export default　React.memo(Chart);
