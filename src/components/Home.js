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

import Chip from './Chip.js';

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
  return date?.toLocaleTimeString("en-us", options)
}

let getDateString = function(date) {
  return date?.toLocaleDateString("en-us", dateOptions)
}

function Home() {

  const [lastUpdate, setLastUpdate] = useState(-1);
  const [gotForecast, setGotForecast] = useState(false);
  const [dateObj, setDateObj] = useState();
  const [weather, setWeather] = useState();
  const [weatherForecast, setWeatherForecast] = useState();

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
    if (dateObj && lastUpdate != dateObj?.getHours()) {
      axiosClient.get("currentconditions/v1/301285?apikey=DeCxXs7gAj6Gyz349pw50Gpb8MeNCoPC")
        .then((response) => {
          setLastUpdate(dateObj.getHours());
          setWeather(response.data[0]);
        });
    }
  }, [dateObj]);

  useEffect(() => {
    if (dateObj && dateObj?.getHours() == 0) {
      if (!gotForecast) {
      	axiosClient.get("forecasts/v1/daily/5day/301285?apikey=DeCxXs7gAj6Gyz349pw50Gpb8MeNCoPC&details=true&metric=true")
          .then((response) => {
            setWeatherForecast(response.data);
	    setGotForecast(true);
          });
      }
    } else {
      setGotForecast(false);
    }
  }, [dateObj]);

  const getWeatherForecast = () => {
    return `H: ${Math.round(getForecastToday()?.Temperature.Maximum.Value)}° ` 
      + `L: ${Math.round(getForecastToday()?.Temperature.Minimum.Value)}°`;
  }

  const getForecastToday = () => {
    const forecast = weatherForecast?.DailyForecasts.filter((t) => {
      return dateObj.getDate() == new Date(t.Date).getDate();
    })
    return forecast?.length > 0 ? forecast[0] : null;
  }

  const getCurrentWeather = () => {
    return `${Math.round(weather?.Temperature?.Metric?.Value)}°`;
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
              <Typography variant="h1" sx={{fontWeight: 'bolder', fontSize: '9rem', marginTop: '-1.5rem'}}>{getCurrentWeather()}</Typography>
              <Typography 
                variant="h1" 
                sx={{
                  color: '#fff', 
                  fontWeight: 'bolder', 
                  fontSize: '2rem',
                  marginLeft: '1.2rem', 
                  marginTop: '-1rem'
                }}
              >
                {getWeatherForecast()}
              </Typography>
              <Box 
                sx={{
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  marginLeft: '0.75rem', 
                  marginTop: '0.75rem'
                }}
              >
                <Box 
                  sx={{
                    display: 'flex', 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    paddingLeft: '8px', 
                    paddingRight: '8px', 
                    paddingTop: '4px', 
                    paddingBottom: '4px', 
                    backgroundColor: '#ffffff', 
                    color: '#EA9300',
                    borderRadius: '5px'
                  }}
                >
                  <FontAwesomeIcon sx={{  }} icon={solid('sun')} size="lg"/>
                  <Typography sx={{ color: '#000000', marginLeft: '0.5rem' }}>{getForecastToday() ? getForecastToday().Sun.Rise.split('T')[1].substring(0,5) : ''}</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex', 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    marginLeft: '0.5rem',
                    paddingLeft: '8px', 
                    paddingRight: '8px', 
                    paddingTop: '4px', 
                    paddingBottom: '4px', 
                    backgroundColor: '#ffffff', 
                    color: '#6699CC',
                    borderRadius: '5px'
                  }}
                >
                  <FontAwesomeIcon icon={solid('moon')} size="lg"/>
                  <Typography sx={{ color: '#000000', marginLeft: '0.5rem' }}>{getForecastToday() ? getForecastToday().Sun.Set.split('T')[1].substring(0,5) : ''}</Typography>
                </Box>
              </Box>
            </Box>
            <Box className={styles['weather-forecast']}>
            </Box>
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
