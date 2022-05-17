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

import me from '../resources/me.jpg';

function Home() {

  
  // var time = today.getHours() + ":" + today.getMinutes();
  let options = {  
    hour: "2-digit", 
    minute: "2-digit", 
    hour12: false
  };  
  
  let dateOptions = {
    month: "long",  
    day: "numeric"
  };

  const [cTime, setTime] = useState();
  const [cDate, setDate] = useState();

  useEffect(() => {
    let timer = setInterval(() => {
      var today = new Date();
      setTime(today.toLocaleTimeString("en-us", options));
      setDate(today.toLocaleDateString("en-us", dateOptions));
    }, 5000);
    
    return () => {
      clearInterval(timer);
    }
  });

console.log(); 

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
            <Typography variant="h1" sx={{fontWeight: 'bolder', fontSize: '15rem', marginTop: '-3rem'}}>{cTime}</Typography>
            <Typography variant="h1" sx={{color: '#fff', fontWeight: 'bolder', fontSize: '3rem'}}>{cDate}</Typography>
          </Box>
        </Grid>

        <Grid item xs={5} key={3}>
          
        </Grid>

      </Grid>
    </Box>
  );
}

export default Home;