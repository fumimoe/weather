import React, { useState } from "react";
import styles from './SearchArea.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { setLocationCity, selectCity } from "../features/api/apiSlice";
import axios from "axios";
import Geocode from "react-geocode";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import DisplayWeather from './DisplayWeather';



const SearchArea = () => {

  const dispatch = useDispatch();
  let cityLocation = useSelector(selectCity);
  const APIKEY:any = process.env.REACT_APP_GOOGLE_API_KEY
  const APIKEY_GEOCODE:any = process.env.REACT_APP_WEATHER_API_KEY
  const [city, setCity] = useState("");
  const [latstate, setLatstate] = useState(35.6761919);
  const [lngstate, setLngstate] = useState(139.7690174);
  const [weather,setWeather] = useState([])

  const weatherData = async (e:any) => {
    dispatch(setLocationCity(city));
    Geocode.setApiKey(APIKEY);
    Geocode.fromAddress(city).then(
      async(response) => {
        // const searchPosition = {
        //   lat: response.results[0].geometry,
        //   lng: response.results[0].geometry
        // }
        const { lat, lng } = response.results[0].geometry.location;
        setLatstate(lat);
        setLngstate(lng);
        console.log(latstate);
        console.log(lngstate);
        await axios
        .get(
          `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&lang=ja&appid=${APIKEY_GEOCODE}`
        )

        .then((response) => {
            const data:any = response.data
            setWeather(data);
          console.log("status:", response.status); // 200
        //   console.log("body:", data); // response body.
        })
        .catch((err) => {
          console.log("err:", err);
        })
        
      },
      (error) => {
        alert("error");
      }

      
    );

    e.preventDefault();
    if (city === "") {
      alert("値を追加してください");
    } else {
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
          <p>地域名：{cityLocation}</p>
        </div>
        {weather ?  <DisplayWeather data={weather}/>:null}
       



        <div className={styles.map_container}>
        <LoadScript googleMapsApiKey={APIKEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      ></GoogleMap>
    </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
