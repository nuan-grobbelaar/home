import * as React from 'react';
import "../../App.css"
import styles from './ForecastContainer.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ForecastCard(props) {
  return (
    <Box sx={props.sx} className={styles.box}>
      {props.children}
    </Box>
  );
}

export default ForecastCard;