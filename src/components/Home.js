import React, { useState, useEffect } from 'react';
import "../App.css"
import styles from './Home.module.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import WeatherCard from './weather/WeatherCard.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import axios from "axios";

let options = {  
  hour: "2-digit", 
  minute: "2-digit", 
  hour12: false
};  

let dateOptions = {
  month: "long",  
  day: "numeric"
};

let getTimeString = function(date) {
  return date ? date.toLocaleTimeString("en-us", options) : '';
}

let getDateString = function(date) {
  return date ? date.toLocaleDateString("en-us", dateOptions) : '';
}

function Home() {
  const [dateObj, setDateObj] = useState();

  useEffect(() => {
    var today = new Date();
    setDateObj(today);
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

          <WeatherCard date={dateObj}>

          </WeatherCard>
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
