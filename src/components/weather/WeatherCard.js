import React, { useState, useEffect } from 'react';
import "../../App.css"
import styles from './WeatherCard.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

import Temperature from './Temperature.js';
import ForecastContainer from './ForecastContainer.js';
import ForecastCard from './ForecastCard.js';
import Moon from './Moon.js';
import WeatherIcon from './WeatherIcon.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import { GiRadiations } from 'react-icons/gi';

import axios from "axios";

const forecastTestData = require('../../test/forecast.json'); 
const todayTestData = require('../../test/today.json'); 

let axiosClient = axios.create({
  baseURL: "http://dataservice.accuweather.com/",
  responseType: 'json',
  timeout: 45000,
});

function WeatherCard(props) {

  const [lastUpdate, setLastUpdate] = useState(-1);
  const [gotForecast, setGotForecast] = useState(false);
  const [weather, setWeather] = useState(todayTestData);
  const [weatherForecast, setWeatherForecast] = useState(forecastTestData);
  const [weeklyForecast, setWeeklyForecast] = useState([]);

  useEffect(() => {
    axiosClient.get("forecasts/v1/daily/5day/301285?apikey=DeCxXs7gAj6Gyz349pw50Gpb8MeNCoPC&details=true&metric=true")
        .then((response) => {
          setWeatherForecast(response.data);
        });
  }, []);

  useEffect(() => {
    if (props.date && lastUpdate != props.date.getHours()) {
      axiosClient.get("currentconditions/v1/301285?apikey=DeCxXs7gAj6Gyz349pw50Gpb8MeNCoPC")
        .then((response) => {
          setWeather(response.data[0]);
        }).finally(setLastUpdate(props.date.getHours()));
    }
  }, [props.date]);

  useEffect(() => {
    setWeeklyForecast(getForecastRange(1, 4));
    if (props.date && props.date.getHours() % 4 == 0) {
      if (!gotForecast) {
      	axiosClient.get("forecasts/v1/daily/10day/301285?apikey=DeCxXs7gAj6Gyz349pw50Gpb8MeNCoPC&details=true&metric=true")
          .then((response) => {
            setWeatherForecast(response.data);
            setWeeklyForecast(getForecastRange(1, 4));
	          
          }).finally(setGotForecast(true));
      }
      
    } else {
      setGotForecast(false);
    }
  }, [props.date]);

  const getTodayHigh = () => {
    let today = getForecast(0);
    return today ? `${Math.round(today.Temperature.Maximum.Value)}` : "00";
  }

  const getTodayLow = () => {
    let today = getForecast(0);
    return today ? `${Math.round(today.Temperature.Minimum.Value)}` : "00";
  }

  const getSunrise = (offset) => {
    let today = getForecast(offset);
    return today ? today.Sun.Rise.split('T')[1].substring(0,5) : '00:00';
  }

  const getSunset = (offset) => {
    let today = getForecast(offset);
    return today ? today.Sun.Set.split('T')[1].substring(0,5) : '22:00';
  }

  const getTodayMoonPhase = () => {
    let today = getForecast(0);
    return today ? `${today.Moon.Phase}` : "cheesy";
  }

  const isDay = () => {
    const today = new Date();
    if (!today) return false;
    return today.getHours() <= Number(getSunset(0).split(':')[0]) 
      && today.getHours() > Number(getSunrise(0).split(':')[0]);
  }

  const getSunInfo = () => {
    const today = new Date();
    if (!today) return '00:00';
    if (isDay()) return getSunset(0);
    else return getSunrise(1);
  }

  const getUvIndex = () => {
    const today = getForecast(0);
    if (!today) return '';
    const result = today.AirAndPollen.filter(t => t.Name == 'UVIndex');
    if (result.length <= 0) return '';
    return result[0].Category.toLowerCase();
  }

  const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const getForecast = (offset) => {
    const today = new Date();
    if (!weatherForecast || !weatherForecast.DailyForecasts) return null;
    const forecast = weatherForecast.DailyForecasts.filter((t) => {
      return today ? addDays(today, offset).getDate() == new Date(t.Date).getDate() : false;
    });

    // if (offset == 1) {
    //   console.log('tomorrow:')
    //   console.log(forecast);
    // }

    if (!forecast || forecast.length <= 0) return '';
    return forecast[0];
  }

  const getForecastRange = (start, end) => {
    const today = new Date();
    if (!weatherForecast || !weatherForecast.DailyForecasts) return [];
    const forecast = weatherForecast.DailyForecasts.filter((t) => {
      let date = new Date(t.Date).getDate();
      return date >= addDays(today, start).getDate() && date <= addDays(today, end).getDate();
    });

    if (!forecast) return '';
    return forecast;
  }

  const getCurrentWeather = () => {
    return weather ? `${Math.round(weather.Temperature.Metric.Value)}` : "00";
  }

  const getWeatherIconNumber = () => {
    return weather ? weather.WeatherIcon : -1;
  }

  const getWeatherDescription = () => {
    return weather ? weather.WeatherText : "The conditions are clear";
  }

  return (
    <Card className={styles['card-bottom']}>
      <Box className={styles['weather-temperature-summary']}>
        {/* <Typography variant="h1" sx={{fontWeight: 'bolder', fontSize: '9rem', marginTop: '-1.5rem'}}>
          {getCurrentWeather()}
        </Typography> */}
        <Temperature size='large'>
          {getCurrentWeather()}
        </Temperature>
        <Box sx={{display: 'flex', flexDirection: 'row', marginTop: '-2rem'}}>
          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesomeIcon style={{marginRight: '0.5rem', color: '#EA0D01'}} icon={solid('chevron-up')} size="lg"/>
            <Temperature size='medium'>{getTodayHigh()}</Temperature>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '1.5rem'}}>
            <FontAwesomeIcon style={{marginRight: '0.5rem', color: '#2F66A9'}} icon={solid('chevron-down')} size="lg"/>
            <Temperature size='medium'>{getTodayLow()}</Temperature>
          </Box>
        </Box>
        <Box 
          sx={{
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginLeft: '0.75rem', 
            marginTop: '1rem'
          }}
        >
          {isDay() &&
            <Box className={styles['sunrise-container']} sx={{ marginRight: '0.5rem' }}>
              <GiRadiations/>
              <Typography sx={{ color: '#000000', marginLeft: '0.5rem' }}>
                {getUvIndex()}
              </Typography>
            </Box>
          }

          <Box className={styles['sunset-container']} sx={{marginRight: '0.5rem'}}>
            <Moon today={new Date()} phase={getTodayMoonPhase()}/>  
            {isDay() &&
              <Typography sx={{ color: '#000000'}}>
                {getSunInfo()}
              </Typography>
            }
          </Box>

          {!isDay() &&
            <Box className={styles['sunrise-container']}>
              <FontAwesomeIcon icon={solid('sun')} size="lg"/>
              <Typography sx={{ color: '#000000', marginLeft: '0.5rem' }}>
                {getSunInfo()}
              </Typography>
            </Box>
          }
        </Box>
        <WeatherIcon sx={{color: '#f9f9f9', marginTop: '1rem'}} size={100} state={getWeatherIconNumber()}>
        </WeatherIcon>
      </Box>
      <ForecastContainer>
        {weeklyForecast.map(forecast =>
          <ForecastCard forecast={forecast}>
          </ForecastCard>
        )}
      </ForecastContainer>
    </Card>
  );
}

export default WeatherCard;