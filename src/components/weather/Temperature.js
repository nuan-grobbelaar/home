import * as React from 'react';
import "../../App.css"
import styles from './Temperature.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Temperature(props) {

  const getClasses = () => {
    if (props.size == 'large') return ['large-temp-main', 'large-temp-accent'];
    if (props.size == 'medium') return ['medium-temp-main', 'medium-temp-accent'];
    if (props.size == 'small') return ['small-temp-main', 'small-temp-accent'];
    return ['', ''];
  }

  let classes = getClasses();

  return (
    <Box sx={props.sx} className={styles.box}>
      <Typography className={styles[classes[0]]}>
        {`${props.children ? props.children : '00'}°`}
      </Typography>
      <Typography className={styles[classes[1]]}>
        {props.children ? 'c' : ''}
      </Typography>
    </Box>
  );
}

export default Temperature;