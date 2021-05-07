import React from "react";
import styles from "./DisplayWeather.module.scss";
import CurrentDate from './Date/CurrentDate';


const DisplayWeather = (props: any) => {
  const weatherData = props.data;
  const dailyDatas = weatherData.daily;
//   let dateTime = new Date( dailyDatas.dt* 1000);
  
  
  //   const iconURL:string = "http://openweathermap.org/img/wn/"+`${weatherData.weather[0].icon}`+".png";
  console.log(props.data);
  console.log(dailyDatas);

  return (
    <>

      {dailyDatas ? (
        <div className={styles.displayweather}>
            
          {dailyDatas.map((dailyData: any, key: number) => {
            return (
              <>
                <p >本日の気温:{ Math.floor(dailyData.temp.day -  273.15)}°C</p>
                <p>最低気温{ Math.floor(dailyData.temp.min -  273.15)}°C</p>
                <p>最高気温{ Math.floor(dailyData.temp.max -  273.15)}°C</p>
                <p>{new Date(dailyData.dt * 1000).toLocaleDateString('ja-JP').slice(5)}</p>
                <CurrentDate />
                <img
                  src={
                    dailyDatas.weather
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
