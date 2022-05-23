import * as React from 'react';
import "../../App.css"
import styles from './WeatherIcon.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { IconContext } from 'react-icons';

import { 
  WiDaySunny, WiDaySunnyOvercast, WiDayCloudy,
  WiDayFog, WiShowers, WiDayShowers,
  WiStormShowers, WiDayStormShowers, WiDayRain,
  WiDaySnow, WiSnow, WiSleet,
  WiHot, WiSnowflakeCold, WiWindy,
  WiNightClear, WiNightPartlyCloudy, WiNightFog,
  WiNightCloudy, WiNightShowers, WiNightThunderstorm,
  WiThunderstorm, WiNightSnow
} from 'react-icons/wi';

import { BiErrorCircle } from 'react-icons/bi';

function WeatherIcon(props) {

  let icons = [
    <WiDaySunny/>,
    <WiDaySunnyOvercast/>,
    <WiDaySunnyOvercast/>,
    <WiDaySunnyOvercast/>,
    <WiDaySunnyOvercast/>,
    <WiDayCloudy/>,
    <WiDayCloudy/>,
    <WiDayCloudy/>,
    null,
    null,
    <WiDayFog/>,
    <WiShowers/>,
    <WiDayShowers/>,
    <WiDayShowers/>,
    <WiStormShowers/>,
    <WiDayStormShowers/>,
    <WiDayStormShowers/>,
    <WiDayRain/>,
    <WiDayRain/>,
    <WiDayRain/>,
    <WiDayRain/>,
    <WiDaySnow/>,
    <WiSnow/>,
    <WiSleet/>,
    <WiSleet/>,
    <WiSleet/>,
    null,
    null,
    <WiSleet/>,
    <WiHot/>,
    <WiSnowflakeCold/>,
    <WiWindy/>,
    <WiNightClear/>,
    <WiNightPartlyCloudy/>,
    <WiNightPartlyCloudy/>,
    <WiNightPartlyCloudy/>,
    <WiNightFog/>,
    <WiNightCloudy/>,
    <WiNightShowers/>,
    <WiShowers/>,
    <WiNightThunderstorm/>,
    <WiThunderstorm/>,
    <WiNightSnow/>,
    <WiNightSnow/>
  ]

  const getIcon = () => {
    console.log(props.state);
    if (props.state == -1) return <BiErrorCircle/>
    return icons[props.state];
  }

  return (
    <Box sx={props.sx} className={styles['box']}>
      <IconContext.Provider value={{size: props.size}}>
        <>
          {getIcon()}
        </>
      </IconContext.Provider>
    </Box>
  );
}

export default WeatherIcon;