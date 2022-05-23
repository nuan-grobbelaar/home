import React, { useState, useEffect } from 'react';
import "../../App.css"
import styles from './ForecastCard.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import WeatherIcon from './WeatherIcon.js';

import Temperature from './Temperature.js';
import WeatherCard from './WeatherCard';

function ForecastCard(props) {

  const [forecast, setForecast] = useState({});

  useEffect(() => {
    props.forecast ? setForecast({
      date: new Date(props.forecast.Date),
      max: Math.round(props.forecast.Temperature.Maximum.Value),
      min: Math.round(props.forecast.Temperature.Minimum.Value),
      icon: props.forecast.Day.Icon,
      phrase: props.forecast.Day.IconPhrase,
      longPhrase: props.forecast.Day.LongPhrase,
      state: props.forecast.Day.Icon
    }) : setForecast({
      date: new Date(),
      max: '00',
      min: '00',
      icon: '',
      phrase: '',
      longPhrase: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et',
      state: 1
    });

    console.log(forecast);
  }, [props.forecast]);

  let dateOptions = {
    month: "long",  
    day: "numeric"
  };

  let getDateString = function(date) {
    return date ? date.toLocaleDateString("en-us", dateOptions) : '';
  }
  

  return (
    <Box sx={props.sx} className={styles.card}>
      <Box className={styles['icon-container']}>
        {/* <FontAwesomeIcon icon={solid('moon')} size="xl"/> */}
        <WeatherIcon size={35} state={forecast.state}></WeatherIcon>
      </Box>
      <Box className={styles['weather-summary']}>
        <Box className={styles['details']}>
          <Typography>
            {getDateString(forecast.date)}
          </Typography>
          <Box sx={{display: 'flex', flexDirection: 'row', marginLeft: 'auto'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesomeIcon style={{marginRight: '0.3rem', color: '#EA0D01'}} icon={solid('chevron-up')} size="xs"/>
              <Temperature size='small'>{forecast.max}</Temperature>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '0.6rem'}}>
              <FontAwesomeIcon style={{marginRight: '0.3rem', color: '#2F66A9'}} icon={solid('chevron-down')} size="xs"/>
              <Temperature size='small'>{forecast.min}</Temperature>
            </Box>
          </Box>
        </Box>
        <Box className={styles['summary']}>
          <Typography sx={{fontSize: '0.7rem'}}>
            {forecast.longPhrase}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ForecastCard;