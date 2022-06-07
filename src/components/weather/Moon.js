import React, { useState } from 'react';
import "../../App.css"
import styles from './Moon.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { IconContext } from 'react-icons';

import { 
  WiMoonFull, WiMoonThirdQuarter, WiMoonNew, WiMoonFirstQuarter,
  WiMoonWaningGibbous1, WiMoonWaningGibbous2, WiMoonWaningGibbous3, WiMoonWaningGibbous4, WiMoonWaningGibbous5, WiMoonWaningGibbous6, 
  WiMoonWaningCrescent1, WiMoonWaningCrescent2, WiMoonWaningCrescent3, WiMoonWaningCrescent4, WiMoonWaningCrescent5, WiMoonWaningCrescent6,  
  WiMoonWaxingCrescent1, WiMoonWaxingCrescent2, WiMoonWaxingCrescent3, WiMoonWaxingCrescent4, WiMoonWaxingCrescent5,
  WiMoonWaxingGibbous1, WiMoonWaxingGibbous2, WiMoonWaxingGibbous3, WiMoonWaxingGibbous4, WiMoonWaxingGibbous5, WiMoonWaxingGibbous6,
} from 'react-icons/wi';

import { BiErrorCircle } from 'react-icons/bi';

function Moon(props) {

  const [lastPhase, setLastPhase] = useState({today: props.today, phase: null, count: 0});

  let phaseMap = {
    New: [<WiMoonNew/>],
    WaxingCrescent: [
      <WiMoonWaxingCrescent1/>,
      <WiMoonWaxingCrescent2/>,
      <WiMoonWaxingCrescent3/>,
      <WiMoonWaxingCrescent4/>,
      <WiMoonWaxingCrescent5/>,
    ],
    First: [<WiMoonFirstQuarter/>],
    WaxingGibbous: [
      <WiMoonWaxingGibbous1/>,
      <WiMoonWaxingGibbous2/>,
      <WiMoonWaxingGibbous3/>,
      <WiMoonWaxingGibbous4/>,
      <WiMoonWaxingGibbous5/>,
      <WiMoonWaxingGibbous6/>,
    ],
    Full: [<WiMoonFull/>],
    WaningGibbous: [
      <WiMoonWaningGibbous1/>,
      <WiMoonWaningGibbous2/>,
      <WiMoonWaningGibbous3/>,
      <WiMoonWaningGibbous4/>,
      <WiMoonWaningGibbous5/>,
      <WiMoonWaningGibbous6/>
    ],
    Third: [<WiMoonThirdQuarter/>],
    WaningCrescent: [
      <WiMoonWaningCrescent1/>,
      <WiMoonWaningCrescent2/>,
      <WiMoonWaningCrescent3/>,
      <WiMoonWaningCrescent4/>,
      <WiMoonWaningCrescent5/>,
      <WiMoonWaningCrescent6/>,
    ],
  }

  const getPhaseIcon = () => {
    //In case AccuWeather returns something the code doesn't recognize
    if (!phaseMap.hasOwnProperty(props.phase)) {
      console.log(props.phase);
      return <BiErrorCircle/>;
    }
    
    //On load
    if (!lastPhase.phase) {
      console.log('on load');
      setLastPhase({today: props.today, phase: props.phase, count: 0});
      return phaseMap[props.phase][0];
    }
    
    //On subsequent updates within the same day
    if (lastPhase.today.getDate() == props.today.getDate()) {
      if (lastPhase.phase == props.phase) {
        return phaseMap[props.phase][lastPhase.count];
      } else {
        return phaseMap[props.phase][0];
      }
    } 

    else {
      console.log(props.today.getDate() + ', ' + props.phase + ', ' + lastPhase.count+1);
      setLastPhase({today: props.today, phase: props.phase, count: lastPhase.count+1});
      return phaseMap[props.phase][lastPhase.count+1];
    }
  }

  return (
    <Box sx={props.sx} className={styles['box']}>
      <IconContext.Provider value={{size: 20}}>
        <>
          {getPhaseIcon()}
        </>
      </IconContext.Provider>
    </Box>
  );
}

export default Moon;