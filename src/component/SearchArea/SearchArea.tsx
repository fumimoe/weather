import React, { useState, useEffect } from "react";
import styles from "./SearchArea.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLocationCity, selectCity } from "../../features/api/locationSlice";
import axios from "axios";
import Geocode from "react-geocode";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import DisplayWeather from "../DisplayWeather/DisplayWeather";
import Chart from "../Chart/Chart";

const SearchArea = () => {
  const dispatch = useDispatch();
  let cityLocation = useSelector(selectCity);
  const APIKEY: any = process.env.REACT_APP_GOOGLE_API_KEY;
  const APIKEY_GEOCODE: any = process.env.REACT_APP_WEATHER_API_KEY;
  const [city, setCity] = useState("");
  const [latstate, setLatstate] = useState(35.6761919);
  const [lngstate, setLngstate] = useState(139.7690174);
  const [weather, setWeather] = useState([]);
  let today = new Date();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  const [center, setCenter] = useState({ lat: 35.6761919, lng: 139.7690174 });
  const [currentPosition, setCurrentPosition] = useState({});

  const firstlocation = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${center.lat}&lon=${center.lng}&lang=ja&appid=${APIKEY_GEOCODE}`
      )
      .then((response) => {
        const data: any = response.data;
        setWeather(data);
        console.log(weather);
        console.log("status:", response.status);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  const success = (data: any) => {
    const currentPosition = {
      lat: data.coords.latitude,
      lng: data.coords.longitude,
    };
    setCurrentPosition(currentPosition);
    setCenter(currentPosition);
    firstlocation();
  };

  const error = (data: any) => {
    const currentPosition = {
      lat: 34.673542,
      lng: 135.433338,
    };
    setCurrentPosition(currentPosition);
    setCenter(currentPosition);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const weatherData = async (e: any) => {
    dispatch(setLocationCity(city));
    Geocode.setApiKey(APIKEY);
    Geocode.fromAddress(city).then(
      async (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatstate(lat);
        setLngstate(lng);

        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&lang=ja&appid=${APIKEY_GEOCODE}`
          )

          .then((response) => {
            const data: any = response.data;
            setWeather(data);
            console.log(weather);
            console.log("status:", response.status);
          })
          .catch((err) => {
            console.log("err:", err);
          });
      },
      (error) => {
        alert("error");
      }
    );

    e.preventDefault();
    if (city === "") {
      alert("??????????????????????????????");
    } else {
      console.log(city);

      setCity("");
    }
  };

  const containerStyle = {
    width: "300px",
    height: "200px",
    margin: "0 auto",
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form_container}>
          <p className={styles.label_title}>?????????</p>
          <form action="">
            <input
              type="text"
              name="city"
              placeholder="??????"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={styles.valuefield}
            />
            <button
              className={styles.submit_btn}
              onClick={(e) => weatherData(e)}
            >
              ??????
            </button>
          </form>
        </div>

        <div className={styles.map_container}>
          <LoadScript googleMapsApiKey={APIKEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={8}
            ></GoogleMap>
          </LoadScript>
        </div>
      </div>
      <div className={styles.weather_area}>
        <div className={styles.display_left}>
          <p className={styles.today_time_title}>
            {month + "???" + day + "???"} <span>????????????</span>
          </p>
          <p className={styles.area_title}>{cityLocation}</p>

          {weather && (
            <>
              <DisplayWeather data={weather} />
            </>
          )}
        </div>
        <div className={styles.display_right}>
          <p className={styles.label}>1?????????????????????</p>
          <Chart data={weather} />
        </div>
      </div>
    </>
  );
};

export default SearchArea;
