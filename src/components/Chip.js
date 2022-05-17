import * as React from 'react';
import "../App.css"
import styles from './Chip.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Chip(props) {

  var classes = [styles.chip, props.className];

  if (props.alt === true) {
    console.log(1);
    classes.push(styles['chip-alt']);

  }

  return (
    <Box 
      className={classes} 
      style={props.style}
    >
      {props.children}
    </Box>
  );
}

export default Chip;