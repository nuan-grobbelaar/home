import * as React from 'react';
import "../../App.css"
import styles from './Moon.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { IconContext } from 'react-icons';

import { 
  WiMoonFull, WiMoonWaningGibbous4, 
  WiMoonThirdQuarter, WiMoonWaningCrescent4, WiMoonNew, 
  WiMoonWaxingCrescent3, WiMoonFirstQuarter, WiMoonWaxingGibbous4 
} from 'react-icons/wi';

function Moon(props) {

  let phaseMap = {
    Full: <WiMoonFull/>,
    WaningGibbous: <WiMoonWaningGibbous4/>,
    ThirdQuarter: <WiMoonThirdQuarter/>,
    WaningCrescent: <WiMoonWaningCrescent4/>,
    New: <WiMoonNew/>,
    WaxingCrescent: <WiMoonWaxingCrescent3/>,
    FirstQuarter: <WiMoonFirstQuarter/>,
    WaxingGibbous: <WiMoonWaxingGibbous4/>
  }

  const getPhaseIcon = () => {
    console.log(props.phase);
    return phaseMap[props.phase];
  }

  return (
    <Box sx={props.sx} className={styles['box']}>
      <IconContext.Provider value={{size: 24}}>
        <>
          {getPhaseIcon()}
        </>
      </IconContext.Provider>
    </Box>
  );
}

export default Moon;