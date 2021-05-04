import React, { useState } from "react";
import styles from "./Search.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLocationCity, selectCity } from "../features/api/apiSlice";
import axios from "axios";
import Geocode from "react-geocode";
import { GoogleMap, LoadScript } from "@react-google-maps/api";



const Search = () => {

  const dispatch = useDispatch();
  let cityLocation = useSelector(selectCity);
  const APIKEY:any = process.env.REACT_APP_GOOGLE_API_KEY
  const APIKEY_GEOCODE:any = process.env.REACT_APP_WEATHER_API_KEY
  console.log(APIKEY)
  console.log(APIKEY_GEOCODE)

  type Position = {
    lat: number,
    lng: number
  }
  

  const [city, setCity] = useState("");
  const [latstate, setLatstate] = useState(35.6761919);
  const [lngstate, setLngstate] = useState(139.7690174);

  const weatherData = async (e:any) => {
    dispatch(setLocationCity(city));
    Geocode.setApiKey(APIKEY);
    Geocode.fromAddress(city).then(
      (response) => {
        const searchPosition = {
          lat: response.results[0].geometry,
          lng: response.results[0].geometry
        }
        // const { lat, lng } = response.results[0].geometry.location;
        // setLatstate(searchPosition.lat);
        // setLngstate(searchPosition.lng);
        console.log(latstate);
        console.log(lngstate);
        
      },
      (error) => {
        alert("error");
      }

      
    );

    e.preventDefault();
    if (city === "") {
      alert("値を追加してください");
    } else {
      await axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${latstate}&lon=${lngstate}&appid=${APIKEY_GEOCODE}`
        )

        .then((response) => {
          console.log("status:", response.status); // 200
          console.log("body:", response.data); // response body.
          

          // catchでエラー時の挙動を定義する
        })
        .catch((err) => {
          console.log("err:", err);
        });

      console.log(city);

      setCity("");
    }
    
  };

  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lat: latstate,
    lng: lngstate,
  };

  return (
    <div>
      <div className={styles.container}>
          <form action="">
        <input
          type="text"
          name="city"
          placeholder="東京"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className={styles.submit_btn}
          onClick={(e) => weatherData(e)}
        >
          送信
        </button>
</form>
        <div>
          <p>地名：{cityLocation}</p>
          <p></p>
        </div>
        <div className={styles.map_container}>
        <LoadScript googleMapsApiKey={APIKEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
      ></GoogleMap>
    </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default Search;
