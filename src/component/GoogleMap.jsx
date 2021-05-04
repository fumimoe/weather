import React from 'react'
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import styles from './GoogleMap.module.scss';
// import Geocode from "react-geocode";
import { useDispatch,useSelector } from 'react-redux'
import {selectCity,lngLocation,latLocation,selectLat,selectLng} from '../features/api/apiSlice';

const GooglesMap = () => {
    const dispatch = useDispatch();
    const cityLocation = useSelector(selectCity);
    let lat = useSelector(selectLat);
    let lng = useSelector(selectLng);
    
    // const APIKEY_GEOCODE = "AIzaSyADFS5M7sELc9auxBQFbtrJC2s4G0reNr8"

    // Geocode.setApiKey(APIKEY_GEOCODE);
    // Geocode.fromAddress(cityLocation).then(
    //     response => {
    //         const {lat,lng} = response.results[0].geometry.location;
    //         dispatch(latLocation(lat))
    //         dispatch(lngLocation(lng))
    //         console.log(lat)
    //         console.log(lng)
            
    //     },
    //     error => {
    //         alert('error')
    //     }
    // );
    
    

    

    return (
      <div></div>
    )
}

export default GooglesMap
