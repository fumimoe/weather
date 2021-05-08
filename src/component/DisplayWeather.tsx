import React from "react";
import styles from "./DisplayWeather.module.scss";
import InitialWeather from './initialweather/InitialWeather'

const DisplayWeather = (props: any) => {
  const weatherData = props.data;
  const dailyDatas = weatherData.daily;
  const todayDatas = weatherData.current;
  console.log(props.data);
  console.log(dailyDatas);


  return (
    <>
      {dailyDatas ? (
        <div className={styles.displayweather}>
          <div className={styles.today_weather}>
            <div className={styles.icon_temperature}>
              <img
                className={styles.today_icon}
                src={
                  "http://openweathermap.org/img/wn/" +
                  `${todayDatas.weather[0].icon}` +
                  ".png"
                }
                alt=""
              />
              <span className={styles.today_title}>
                {Math.floor(todayDatas.temp - 273.15)}°C
              </span>
            </div>
            <div className={styles.temperature_info}>
              <span className={styles.title}>
                体感温度:{Math.floor(todayDatas.feels_like - 273.15)}°C
              </span>
              <span className={styles.title}>
                最高気温:{Math.floor(dailyDatas[0].temp.max - 273.15)}°C
              </span>
              <span className={styles.title}>
                最低気温:{Math.floor(dailyDatas[0].temp.min - 273.15)}°C
              </span>
            </div>
            <div className={styles.Details_container}>
              <div className={styles.today_Details}>
                <div className={styles.today_Details_info}>
                  風速:{todayDatas.wind_speed}m/s
                </div>
                <div className={styles.today_Details_info}>
                  気圧:{todayDatas.pressure}hPa
                </div>
                <div className={styles.today_Details_info}>
                  湿度:{todayDatas.humidity}%
                </div>
              </div>
            </div>
          </div>

          <div className={styles.week_weather_container}>
            {dailyDatas.map((dailyData: any, index: number) => {
              return (
                <div className={styles.each_weather}>
                  <p className={styles.data_title}>
                    {new Date(dailyData.dt * 1000)
                      .toLocaleDateString("ja-JP")
                      .slice(5)}
                  </p>
                  <img
                    src={
                      dailyData.weather
                        ? "http://openweathermap.org/img/wn/" +
                          `${dailyData.weather[0].icon}` +
                          ".png"
                        : "http://openweathermap.org/img/wn/01d.png"
                    }
                    alt=""
                    className={styles.icon}
                  />
                  <p className={styles.temperature_title}>
                    {Math.floor(dailyData.temp.max - 273.15)}/
                    {Math.floor(dailyData.temp.min - 273.15)}°C
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles.displayweather}>
          <div className={styles.today_weather}>
            <div className={styles.icon_temperature}>
              <img
                className={styles.today_icon}
                src={"http://openweathermap.org/img/wn/01d.png"}
                alt=""
              />
              <span className={styles.today_title}>--°C</span>
            </div>
            <div className={styles.temperature_info}>
              <span className={styles.title}>体感温度:--°C</span>
              <span className={styles.title}>最高気温:--°C</span>
              <span className={styles.title}>最低気温:--°C</span>
            </div>
            <div className={styles.Details_container}>
              <div className={styles.today_Details}>
                <div className={styles.today_Details_info}>風速:--m/s</div>
                <div className={styles.today_Details_info}>気圧:--hPa</div>
                <div className={styles.today_Details_info}>湿度:--%</div>
              </div>
            </div>
          </div>

          <InitialWeather/>
         

        </div>
      )}
    </>
  );
};

export default DisplayWeather;
