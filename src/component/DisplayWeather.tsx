import React from "react";
import styles from "./DisplayWeather.module.scss";

const DisplayWeather = (props: any) => {
  const weatherData = props.data;
  const dailyDatas = weatherData.daily;
  //   const iconURL:string = "http://openweathermap.org/img/wn/"+`${weatherData.weather[0].icon}`+".png";
  console.log(props.data);
  console.log(dailyDatas);

  return (
    <div className={styles.displayweather}>
      {dailyDatas.map((dailyData: any) => {
          return(
            <>
            <p>本日の気温{dailyData.temp.day}</p>
            <p>最低気温{dailyData.temp.min}</p>
            <p>最高気温{dailyData.temp.max}</p>
          </>
          )
      
      })}
      {weatherData.daily ? (
        <p>気温：{Math.floor(weatherData.daily.temp - 273.15)}°C</p>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default DisplayWeather;

