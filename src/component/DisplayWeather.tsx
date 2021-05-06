import React from "react";
import styles from "./DisplayWeather.module.scss";

const DisplayWeather = (props: any) => {
  const weatherData = props.data;
  const dailyDatas = weatherData.daily;
  //   const iconURL:string = "http://openweathermap.org/img/wn/"+`${weatherData.weather[0].icon}`+".png";
  console.log(props.data);
  console.log(dailyDatas);

  return (
    <>
      {weatherData ? (
        <div className={styles.displayweather}>
          {dailyDatas.map((dailyData: any, key: number) => {
            return (
              <>
                <p>本日の気温{dailyData.temp.day}</p>
                <p>最低気温{dailyData.temp.min}</p>
                <p>最高気温{dailyData.temp.max}</p>
                <img
                  src={
                    dailyDatas
                      ? "http://openweathermap.org/img/wn/" +
                        `${dailyDatas.weather[key].icon}` +
                        ".png"
                      : "http://openweathermap.org/img/wn/01d.png"
                  }
                  alt=""
                />
              </>
            );
          })}
        </div>
      ) : (
        <div>
          <p>本日の気温:</p>
          <p>最低気温:</p>
          <p>最高気温:</p>
        </div>
      )}
    </>
  );
};

export default DisplayWeather;
