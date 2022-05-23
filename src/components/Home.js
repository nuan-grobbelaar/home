import React, { useState, useEffect } from 'react';
import "../App.css"
import styles from './Home.module.css'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import Temperature from './weather/Temperature.js';
import ForecastContainer from './weather/ForecastContainer.js';
import ForecastCard from './weather/ForecastCard.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import axios from "axios";

import me from '../resources/me.jpg';

let options = {  
  hour: "2-digit", 
  minute: "2-digit", 
  hour12: false
};  

let dateOptions = {
  month: "long",  
  day: "numeric"
};

let axiosClient = axios.create({
  baseURL: "http://dataservice.accuweather.com/",
  responseType: 'json',
  timeout: 45000,
});

let getTimeString = function(date) {
  return date ? date.toLocaleTimeString("en-us", options) : '';
}

let getDateString = function(date) {
  return date ? date.toLocaleDateString("en-us", dateOptions) : '';
}

function Home() {

  const [lastUpdate, setLastUpdate] = useState(-1);
  const [gotForecast, setGotForecast] = useState(false);
  const [dateObj, setDateObj] = useState();
  const [weather, setWeather] = useState();
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [weeklyForecast, setWeeklyForecast] = useState([]);

  useEffect(() => {
    var today = new Date();
    setDateObj(today);

    axiosClient.get("forecasts/v1/daily/5day/301285?apikey=DeCxXs7gAj6Gyz349pw50Gpb8MeNCoPC&details=true&metric=true")
        .then((response) => {
          setWeatherForecast(response.data);
        });
  }, []);

  useEffect(() => {
    let timer = setInterval(() => {
      var today = new Date();
      setDateObj(today);
    }, 5000);
    
    return () => {
      clearInterval(timer);
    }
  });

  useEffect(() => {
    if (dateObj && lastUpdate != dateObj.getHours()) {
      axiosClient.get("currentconditions/v1/301285?apikey=DeCxXs7gAj6Gyz349pw50Gpb8MeNCoPC")
        .then((response) => {
          setWeather(response.data[0]);
        }).finally(setLastUpdate(dateObj.getHours()));
    }
  }, [dateObj]);

  useEffect(() => {
    console.log(getForecastRange(1, 4))
    setWeeklyForecast(getForecastRange(1, 4));
    if (dateObj && dateObj.getHours() % 4 == 0) {
      if (!gotForecast) {
      	axiosClient.get("forecasts/v1/daily/5day/301285?apikey=DeCxXs7gAj6Gyz349pw50Gpb8MeNCoPC&details=true&metric=true")
          .then((response) => {
            setWeatherForecast(response.data);
            setWeeklyForecast(getForecastRange(1, 4));
	          
          }).finally(setGotForecast(true));
        
      }
      
    } else {
      setGotForecast(false);
    }
  }, [dateObj]);

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
    return today ? `${today.Moon.phase}` : "cheesy";
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

  

  return (
    <Box 
      className={styles.box}
    >
      <Grid container 
        spacing={3} 
        columns={{ xs: 3, sm: 10 }}
        rows={{xs: 2}}
        className={styles.grid}
      >
        {/* <Grid item xs={2} key={2}>
          
        </Grid> */}

        <Grid item xs={5} key={1}>
          <Box className={styles['box-alt']}>
            <Typography variant="h1" sx={{fontWeight: 'bolder', fontSize: '15rem', marginTop: '-3rem'}}>
              {getTimeString(dateObj)}
            </Typography>
            <Typography variant="h1" sx={{color: '#fff', fontWeight: 'bolder', fontSize: '3rem'}}>
              {getDateString(dateObj)}
            </Typography>
          </Box>

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
                  <Temperature size='medium'>{getTodayLow()}</Temperature>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '1.5rem'}}>
                  <FontAwesomeIcon style={{marginRight: '0.5rem', color: '#2F66A9'}} icon={solid('chevron-down')} size="lg"/>
                  <Temperature size='medium'>{getTodayHigh()}</Temperature>
                </Box>
              </Box>
              <Box 
                sx={{
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  marginLeft: '0.75rem', 
                  marginTop: '0.75rem'
                }}
              >
                {isDay() ? 
                  <Box className={styles['sunset-container']}>
                    <FontAwesomeIcon icon={solid('moon')} size="lg"/>
                    <Typography sx={{ color: '#000000', marginLeft: '0.5rem' }}>
                      {getSunInfo()}
                    </Typography>
                  </Box>
                  :
                  <Box className={styles['sunrise-container']}>
                    <FontAwesomeIcon sx={{  }} icon={solid('sun')} size="lg"/>
                    <Typography sx={{ color: '#000000', marginLeft: '0.5rem' }}>
                      {getSunInfo()}
                    </Typography>
                  </Box>
                }
                {isDay() && 
                  <Typography sx={{ color: '#000000', marginLeft: '0.5rem' }}>
                    {getTodayMoonPhase()}
                  </Typography>
                }
              </Box>
            </Box>
            <ForecastContainer>
              {weeklyForecast.map(forecast =>
                <ForecastCard forecast={forecast}>
                </ForecastCard>
              )}
            </ForecastContainer>
          </Card>
        </Grid>

        <Grid item xs={5} key={3}>
          <Card className={styles['card']}>
            
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
}

export default Home;
