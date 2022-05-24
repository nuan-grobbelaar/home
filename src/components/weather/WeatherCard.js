import React, { useState, useEffect } from 'react';
import "../../App.css"
import styles from './WeatherCard.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

import Temperature from './Temperature.js';
import ForecastContainer from './ForecastContainer.js';
import ForecastCard from './ForecastCard.js';
import Moon from './Moon.js';
import WeatherIcon from './WeatherIcon.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import axios from "axios";

let axiosClient = axios.create({
  baseURL: "http://dataservice.accuweather.com/",
  responseType: 'json',
  timeout: 45000,
});

function WeatherCard(props) {

  const [lastUpdate, setLastUpdate] = useState(-1);
  const [gotForecast, setGotForecast] = useState(false);
  const [weather, setWeather] = useState({
    "LocalObservationDateTime": "2022-05-24T12:37:00+02:00",
    "EpochTime": 1653388620,
    "WeatherText": "Drizzle",
    "WeatherIcon": 12,
    "HasPrecipitation": true,
    "PrecipitationType": "Rain",
    "IsDayTime": true,
    "Temperature": {
        "Metric": {
            "Value": 16.1,
            "Unit": "C",
            "UnitType": 17
        },
        "Imperial": {
            "Value": 61,
            "Unit": "F",
            "UnitType": 18
        }
    },
    "MobileLink": "http://www.accuweather.com/en/za/brackenfell/301285/current-weather/301285?lang=en-us",
    "Link": "http://www.accuweather.com/en/za/brackenfell/301285/current-weather/301285?lang=en-us"
});
  const [weatherForecast, setWeatherForecast] = useState({
    "Headline": {
        "EffectiveDate": "2022-05-24T01:00:00+02:00",
        "EffectiveEpochDate": 1653346800,
        "Severity": 5,
        "Text": "Expect showery weather late Monday night through Tuesday afternoon",
        "Category": "rain",
        "EndDate": "2022-05-24T19:00:00+02:00",
        "EndEpochDate": 1653411600,
        "MobileLink": "http://www.accuweather.com/en/za/brackenfell/301285/daily-weather-forecast/301285?unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/za/brackenfell/301285/daily-weather-forecast/301285?unit=c&lang=en-us"
    },
    "DailyForecasts": [
        {
            "Date": "2022-05-23T07:00:00+02:00",
            "EpochDate": 1653282000,
            "Sun": {
                "Rise": "2022-05-23T07:36:00+02:00",
                "EpochRise": 1653284160,
                "Set": "2022-05-23T17:48:00+02:00",
                "EpochSet": 1653320880
            },
            "Moon": {
                "Rise": "2022-05-23T00:33:00+02:00",
                "EpochRise": 1653258780,
                "Set": "2022-05-23T14:12:00+02:00",
                "EpochSet": 1653307920,
                "Phase": "WaningCrescent",
                "Age": 23
            },
            "Temperature": {
                "Minimum": {
                    "Value": 12.6,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 19.2,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "RealFeelTemperature": {
                "Minimum": {
                    "Value": 9.9,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Chilly"
                },
                "Maximum": {
                    "Value": 18,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Pleasant"
                }
            },
            "RealFeelTemperatureShade": {
                "Minimum": {
                    "Value": 9.9,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Chilly"
                },
                "Maximum": {
                    "Value": 17.2,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Pleasant"
                }
            },
            "HoursOfSun": 1.2,
            "DegreeDaySummary": {
                "Heating": {
                    "Value": 2,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Cooling": {
                    "Value": 0,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "AirAndPollen": [
                {
                    "Name": "AirQuality",
                    "Value": 0,
                    "Category": "Good",
                    "CategoryValue": 1,
                    "Type": "Ozone"
                },
                {
                    "Name": "Grass",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "Mold",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "Ragweed",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "Tree",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "UVIndex",
                    "Value": 1,
                    "Category": "Low",
                    "CategoryValue": 1
                }
            ],
            "Day": {
                "Icon": 4,
                "IconPhrase": "Intermittent clouds",
                "HasPrecipitation": false,
                "ShortPhrase": "Sun through high clouds",
                "LongPhrase": "Sun through high clouds",
                "PrecipitationProbability": 4,
                "ThunderstormProbability": 0,
                "RainProbability": 4,
                "SnowProbability": 0,
                "IceProbability": 0,
                "Wind": {
                    "Speed": {
                        "Value": 16.7,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 332,
                        "Localized": "NNW",
                        "English": "NNW"
                    }
                },
                "WindGust": {
                    "Speed": {
                        "Value": 35.2,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 310,
                        "Localized": "NW",
                        "English": "NW"
                    }
                },
                "TotalLiquid": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Rain": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Snow": {
                    "Value": 0,
                    "Unit": "cm",
                    "UnitType": 4
                },
                "Ice": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "HoursOfPrecipitation": 0,
                "HoursOfRain": 0,
                "HoursOfSnow": 0,
                "HoursOfIce": 0,
                "CloudCover": 99,
                "Evapotranspiration": {
                    "Value": 1,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "SolarIrradiance": {
                    "Value": 4334.2,
                    "Unit": "W/m²",
                    "UnitType": 33
                }
            },
            "Night": {
                "Icon": 40,
                "IconPhrase": "Mostly cloudy w/ showers",
                "HasPrecipitation": true,
                "PrecipitationType": "Rain",
                "PrecipitationIntensity": "Light",
                "ShortPhrase": "A stray shower late",
                "LongPhrase": "Increasing clouds with a shower in places late",
                "PrecipitationProbability": 40,
                "ThunderstormProbability": 8,
                "RainProbability": 40,
                "SnowProbability": 0,
                "IceProbability": 0,
                "Wind": {
                    "Speed": {
                        "Value": 14.8,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 352,
                        "Localized": "N",
                        "English": "N"
                    }
                },
                "WindGust": {
                    "Speed": {
                        "Value": 33.3,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 357,
                        "Localized": "N",
                        "English": "N"
                    }
                },
                "TotalLiquid": {
                    "Value": 0.2,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Rain": {
                    "Value": 0.2,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Snow": {
                    "Value": 0,
                    "Unit": "cm",
                    "UnitType": 4
                },
                "Ice": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "HoursOfPrecipitation": 0.5,
                "HoursOfRain": 0.5,
                "HoursOfSnow": 0,
                "HoursOfIce": 0,
                "CloudCover": 98,
                "Evapotranspiration": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "SolarIrradiance": {
                    "Value": 0,
                    "Unit": "W/m²",
                    "UnitType": 33
                }
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/za/brackenfell/301285/daily-weather-forecast/301285?day=1&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/za/brackenfell/301285/daily-weather-forecast/301285?day=1&unit=c&lang=en-us"
        },
        {
            "Date": "2022-05-24T07:00:00+02:00",
            "EpochDate": 1653368400,
            "Sun": {
                "Rise": "2022-05-24T07:36:00+02:00",
                "EpochRise": 1653370560,
                "Set": "2022-05-24T17:47:00+02:00",
                "EpochSet": 1653407220
            },
            "Moon": {
                "Rise": "2022-05-24T01:38:00+02:00",
                "EpochRise": 1653349080,
                "Set": "2022-05-24T14:41:00+02:00",
                "EpochSet": 1653396060,
                "Phase": "WaningCrescent",
                "Age": 24
            },
            "Temperature": {
                "Minimum": {
                    "Value": 12,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 17.3,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "RealFeelTemperature": {
                "Minimum": {
                    "Value": 11.9,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Cool"
                },
                "Maximum": {
                    "Value": 16.2,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Cool"
                }
            },
            "RealFeelTemperatureShade": {
                "Minimum": {
                    "Value": 11.9,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Cool"
                },
                "Maximum": {
                    "Value": 15.3,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Cool"
                }
            },
            "HoursOfSun": 1.4,
            "DegreeDaySummary": {
                "Heating": {
                    "Value": 3,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Cooling": {
                    "Value": 0,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "AirAndPollen": [
                {
                    "Name": "AirQuality",
                    "Value": 0,
                    "Category": "Good",
                    "CategoryValue": 1,
                    "Type": "Ozone"
                },
                {
                    "Name": "Grass",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "Mold",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "Ragweed",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "Tree",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "UVIndex",
                    "Value": 1,
                    "Category": "Low",
                    "CategoryValue": 1
                }
            ],
            "Day": {
                "Icon": 12,
                "IconPhrase": "Showers",
                "HasPrecipitation": true,
                "PrecipitationType": "Rain",
                "PrecipitationIntensity": "Light",
                "ShortPhrase": "A few showers in the morning",
                "LongPhrase": "Cloudy; brief showers in the morning followed by a shower in spots in the afternoon",
                "PrecipitationProbability": 78,
                "ThunderstormProbability": 16,
                "RainProbability": 78,
                "SnowProbability": 0,
                "IceProbability": 0,
                "Wind": {
                    "Speed": {
                        "Value": 18.5,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 318,
                        "Localized": "NW",
                        "English": "NW"
                    }
                },
                "WindGust": {
                    "Speed": {
                        "Value": 35.2,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 352,
                        "Localized": "N",
                        "English": "N"
                    }
                },
                "TotalLiquid": {
                    "Value": 2.9,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Rain": {
                    "Value": 2.9,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Snow": {
                    "Value": 0,
                    "Unit": "cm",
                    "UnitType": 4
                },
                "Ice": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "HoursOfPrecipitation": 2,
                "HoursOfRain": 2,
                "HoursOfSnow": 0,
                "HoursOfIce": 0,
                "CloudCover": 97,
                "Evapotranspiration": {
                    "Value": 0.5,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "SolarIrradiance": {
                    "Value": 4460.8,
                    "Unit": "W/m²",
                    "UnitType": 33
                }
            },
            "Night": {
                "Icon": 8,
                "IconPhrase": "Dreary",
                "HasPrecipitation": false,
                "ShortPhrase": "Low clouds",
                "LongPhrase": "Low clouds",
                "PrecipitationProbability": 5,
                "ThunderstormProbability": 0,
                "RainProbability": 5,
                "SnowProbability": 0,
                "IceProbability": 0,
                "Wind": {
                    "Speed": {
                        "Value": 9.3,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 343,
                        "Localized": "NNW",
                        "English": "NNW"
                    }
                },
                "WindGust": {
                    "Speed": {
                        "Value": 18.5,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 306,
                        "Localized": "NW",
                        "English": "NW"
                    }
                },
                "TotalLiquid": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Rain": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Snow": {
                    "Value": 0,
                    "Unit": "cm",
                    "UnitType": 4
                },
                "Ice": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "HoursOfPrecipitation": 0,
                "HoursOfRain": 0,
                "HoursOfSnow": 0,
                "HoursOfIce": 0,
                "CloudCover": 99,
                "Evapotranspiration": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "SolarIrradiance": {
                    "Value": 0,
                    "Unit": "W/m²",
                    "UnitType": 33
                }
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/za/brackenfell/301285/daily-weather-forecast/301285?day=2&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/za/brackenfell/301285/daily-weather-forecast/301285?day=2&unit=c&lang=en-us"
        },
        {
            "Date": "2022-05-25T07:00:00+02:00",
            "EpochDate": 1653454800,
            "Sun": {
                "Rise": "2022-05-25T07:37:00+02:00",
                "EpochRise": 1653457020,
                "Set": "2022-05-25T17:47:00+02:00",
                "EpochSet": 1653493620
            },
            "Moon": {
                "Rise": "2022-05-25T02:39:00+02:00",
                "EpochRise": 1653439140,
                "Set": "2022-05-25T15:09:00+02:00",
                "EpochSet": 1653484140,
                "Phase": "WaningCrescent",
                "Age": 25
            },
            "Temperature": {
                "Minimum": {
                    "Value": 10.2,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 18.7,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "RealFeelTemperature": {
                "Minimum": {
                    "Value": 10.9,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Cool"
                },
                "Maximum": {
                    "Value": 18.9,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Pleasant"
                }
            },
            "RealFeelTemperatureShade": {
                "Minimum": {
                    "Value": 10.9,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Cool"
                },
                "Maximum": {
                    "Value": 17,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Pleasant"
                }
            },
            "HoursOfSun": 4.4,
            "DegreeDaySummary": {
                "Heating": {
                    "Value": 4,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Cooling": {
                    "Value": 0,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "AirAndPollen": [
                {
                    "Name": "AirQuality",
                    "Value": 0,
                    "Category": "Good",
                    "CategoryValue": 1,
                    "Type": "Ozone"
                },
                {
                    "Name": "Grass",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "Mold",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "Ragweed",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "Tree",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "UVIndex",
                    "Value": 3,
                    "Category": "Moderate",
                    "CategoryValue": 2
                }
            ],
            "Day": {
                "Icon": 4,
                "IconPhrase": "Intermittent clouds",
                "HasPrecipitation": false,
                "ShortPhrase": "Clouds and sunshine",
                "LongPhrase": "Clouds and sunshine",
                "PrecipitationProbability": 25,
                "ThunderstormProbability": 0,
                "RainProbability": 25,
                "SnowProbability": 0,
                "IceProbability": 0,
                "Wind": {
                    "Speed": {
                        "Value": 13,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 291,
                        "Localized": "WNW",
                        "English": "WNW"
                    }
                },
                "WindGust": {
                    "Speed": {
                        "Value": 24.1,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 348,
                        "Localized": "NNW",
                        "English": "NNW"
                    }
                },
                "TotalLiquid": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Rain": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Snow": {
                    "Value": 0,
                    "Unit": "cm",
                    "UnitType": 4
                },
                "Ice": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "HoursOfPrecipitation": 0,
                "HoursOfRain": 0,
                "HoursOfSnow": 0,
                "HoursOfIce": 0,
                "CloudCover": 65,
                "Evapotranspiration": {
                    "Value": 1.5,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "SolarIrradiance": {
                    "Value": 7716.9,
                    "Unit": "W/m²",
                    "UnitType": 33
                }
            },
            "Night": {
                "Icon": 34,
                "IconPhrase": "Mostly clear",
                "HasPrecipitation": false,
                "ShortPhrase": "Mainly clear",
                "LongPhrase": "Mainly clear",
                "PrecipitationProbability": 5,
                "ThunderstormProbability": 0,
                "RainProbability": 5,
                "SnowProbability": 0,
                "IceProbability": 0,
                "Wind": {
                    "Speed": {
                        "Value": 7.4,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 44,
                        "Localized": "NE",
                        "English": "NE"
                    }
                },
                "WindGust": {
                    "Speed": {
                        "Value": 13,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 246,
                        "Localized": "WSW",
                        "English": "WSW"
                    }
                },
                "TotalLiquid": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Rain": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Snow": {
                    "Value": 0,
                    "Unit": "cm",
                    "UnitType": 4
                },
                "Ice": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "HoursOfPrecipitation": 0,
                "HoursOfRain": 0,
                "HoursOfSnow": 0,
                "HoursOfIce": 0,
                "CloudCover": 13,
                "Evapotranspiration": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "SolarIrradiance": {
                    "Value": 0,
                    "Unit": "W/m²",
                    "UnitType": 33
                }
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/za/brackenfell/301285/daily-weather-forecast/301285?day=3&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/za/brackenfell/301285/daily-weather-forecast/301285?day=3&unit=c&lang=en-us"
        },
        {
            "Date": "2022-05-26T07:00:00+02:00",
            "EpochDate": 1653541200,
            "Sun": {
                "Rise": "2022-05-26T07:38:00+02:00",
                "EpochRise": 1653543480,
                "Set": "2022-05-26T17:47:00+02:00",
                "EpochSet": 1653580020
            },
            "Moon": {
                "Rise": "2022-05-26T03:40:00+02:00",
                "EpochRise": 1653529200,
                "Set": "2022-05-26T15:36:00+02:00",
                "EpochSet": 1653572160,
                "Phase": "WaningCrescent",
                "Age": 26
            },
            "Temperature": {
                "Minimum": {
                    "Value": 9.7,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 19.8,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "RealFeelTemperature": {
                "Minimum": {
                    "Value": 9.7,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Chilly"
                },
                "Maximum": {
                    "Value": 19.5,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Pleasant"
                }
            },
            "RealFeelTemperatureShade": {
                "Minimum": {
                    "Value": 9.7,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Chilly"
                },
                "Maximum": {
                    "Value": 18,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Pleasant"
                }
            },
            "HoursOfSun": 10.1,
            "DegreeDaySummary": {
                "Heating": {
                    "Value": 3,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Cooling": {
                    "Value": 0,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "AirAndPollen": [
                {
                    "Name": "AirQuality",
                    "Value": 0,
                    "Category": "Good",
                    "CategoryValue": 1,
                    "Type": "Ozone"
                },
                {
                    "Name": "Grass",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "Mold",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "Ragweed",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "Tree",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "UVIndex",
                    "Value": 3,
                    "Category": "Moderate",
                    "CategoryValue": 2
                }
            ],
            "Day": {
                "Icon": 1,
                "IconPhrase": "Sunny",
                "HasPrecipitation": false,
                "ShortPhrase": "Plenty of sunshine",
                "LongPhrase": "Plenty of sunshine",
                "PrecipitationProbability": 1,
                "ThunderstormProbability": 0,
                "RainProbability": 1,
                "SnowProbability": 0,
                "IceProbability": 0,
                "Wind": {
                    "Speed": {
                        "Value": 14.8,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 170,
                        "Localized": "S",
                        "English": "S"
                    }
                },
                "WindGust": {
                    "Speed": {
                        "Value": 42.6,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 176,
                        "Localized": "S",
                        "English": "S"
                    }
                },
                "TotalLiquid": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Rain": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Snow": {
                    "Value": 0,
                    "Unit": "cm",
                    "UnitType": 4
                },
                "Ice": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "HoursOfPrecipitation": 0,
                "HoursOfRain": 0,
                "HoursOfSnow": 0,
                "HoursOfIce": 0,
                "CloudCover": 0,
                "Evapotranspiration": {
                    "Value": 2,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "SolarIrradiance": {
                    "Value": 12824.7,
                    "Unit": "W/m²",
                    "UnitType": 33
                }
            },
            "Night": {
                "Icon": 34,
                "IconPhrase": "Mostly clear",
                "HasPrecipitation": false,
                "ShortPhrase": "Mainly clear",
                "LongPhrase": "Mainly clear",
                "PrecipitationProbability": 0,
                "ThunderstormProbability": 0,
                "RainProbability": 0,
                "SnowProbability": 0,
                "IceProbability": 0,
                "Wind": {
                    "Speed": {
                        "Value": 11.1,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 198,
                        "Localized": "SSW",
                        "English": "SSW"
                    }
                },
                "WindGust": {
                    "Speed": {
                        "Value": 35.2,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 170,
                        "Localized": "S",
                        "English": "S"
                    }
                },
                "TotalLiquid": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Rain": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Snow": {
                    "Value": 0,
                    "Unit": "cm",
                    "UnitType": 4
                },
                "Ice": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "HoursOfPrecipitation": 0,
                "HoursOfRain": 0,
                "HoursOfSnow": 0,
                "HoursOfIce": 0,
                "CloudCover": 22,
                "Evapotranspiration": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "SolarIrradiance": {
                    "Value": 0,
                    "Unit": "W/m²",
                    "UnitType": 33
                }
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/za/brackenfell/301285/daily-weather-forecast/301285?day=4&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/za/brackenfell/301285/daily-weather-forecast/301285?day=4&unit=c&lang=en-us"
        },
        {
            "Date": "2022-05-27T07:00:00+02:00",
            "EpochDate": 1653627600,
            "Sun": {
                "Rise": "2022-05-27T07:38:00+02:00",
                "EpochRise": 1653629880,
                "Set": "2022-05-27T17:46:00+02:00",
                "EpochSet": 1653666360
            },
            "Moon": {
                "Rise": "2022-05-27T04:38:00+02:00",
                "EpochRise": 1653619080,
                "Set": "2022-05-27T16:03:00+02:00",
                "EpochSet": 1653660180,
                "Phase": "WaningCrescent",
                "Age": 27
            },
            "Temperature": {
                "Minimum": {
                    "Value": 10.3,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Maximum": {
                    "Value": 23.1,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "RealFeelTemperature": {
                "Minimum": {
                    "Value": 9.7,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Chilly"
                },
                "Maximum": {
                    "Value": 22.6,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Pleasant"
                }
            },
            "RealFeelTemperatureShade": {
                "Minimum": {
                    "Value": 9.7,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Chilly"
                },
                "Maximum": {
                    "Value": 21.6,
                    "Unit": "C",
                    "UnitType": 17,
                    "Phrase": "Pleasant"
                }
            },
            "HoursOfSun": 1.4,
            "DegreeDaySummary": {
                "Heating": {
                    "Value": 1,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Cooling": {
                    "Value": 0,
                    "Unit": "C",
                    "UnitType": 17
                }
            },
            "AirAndPollen": [
                {
                    "Name": "AirQuality",
                    "Value": 0,
                    "Category": "Good",
                    "CategoryValue": 1,
                    "Type": "Ozone"
                },
                {
                    "Name": "Grass",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "Mold",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "Ragweed",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "Tree",
                    "Value": 0,
                    "Category": "Low",
                    "CategoryValue": 1
                },
                {
                    "Name": "UVIndex",
                    "Value": 2,
                    "Category": "Low",
                    "CategoryValue": 1
                }
            ],
            "Day": {
                "Icon": 4,
                "IconPhrase": "Intermittent clouds",
                "HasPrecipitation": false,
                "ShortPhrase": "Sun through high clouds",
                "LongPhrase": "Sun through high clouds",
                "PrecipitationProbability": 0,
                "ThunderstormProbability": 0,
                "RainProbability": 0,
                "SnowProbability": 0,
                "IceProbability": 0,
                "Wind": {
                    "Speed": {
                        "Value": 11.1,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 196,
                        "Localized": "SSW",
                        "English": "SSW"
                    }
                },
                "WindGust": {
                    "Speed": {
                        "Value": 20.4,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 175,
                        "Localized": "S",
                        "English": "S"
                    }
                },
                "TotalLiquid": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Rain": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Snow": {
                    "Value": 0,
                    "Unit": "cm",
                    "UnitType": 4
                },
                "Ice": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "HoursOfPrecipitation": 0,
                "HoursOfRain": 0,
                "HoursOfSnow": 0,
                "HoursOfIce": 0,
                "CloudCover": 95,
                "Evapotranspiration": {
                    "Value": 1.5,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "SolarIrradiance": {
                    "Value": 4128.7,
                    "Unit": "W/m²",
                    "UnitType": 33
                }
            },
            "Night": {
                "Icon": 34,
                "IconPhrase": "Mostly clear",
                "HasPrecipitation": false,
                "ShortPhrase": "Mainly clear",
                "LongPhrase": "Mainly clear",
                "PrecipitationProbability": 0,
                "ThunderstormProbability": 0,
                "RainProbability": 0,
                "SnowProbability": 0,
                "IceProbability": 0,
                "Wind": {
                    "Speed": {
                        "Value": 9.3,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 96,
                        "Localized": "E",
                        "English": "E"
                    }
                },
                "WindGust": {
                    "Speed": {
                        "Value": 18.5,
                        "Unit": "km/h",
                        "UnitType": 7
                    },
                    "Direction": {
                        "Degrees": 356,
                        "Localized": "N",
                        "English": "N"
                    }
                },
                "TotalLiquid": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Rain": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "Snow": {
                    "Value": 0,
                    "Unit": "cm",
                    "UnitType": 4
                },
                "Ice": {
                    "Value": 0,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "HoursOfPrecipitation": 0,
                "HoursOfRain": 0,
                "HoursOfSnow": 0,
                "HoursOfIce": 0,
                "CloudCover": 47,
                "Evapotranspiration": {
                    "Value": 0.3,
                    "Unit": "mm",
                    "UnitType": 3
                },
                "SolarIrradiance": {
                    "Value": 0,
                    "Unit": "W/m²",
                    "UnitType": 33
                }
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/za/brackenfell/301285/daily-weather-forecast/301285?day=5&unit=c&lang=en-us",
            "Link": "http://www.accuweather.com/en/za/brackenfell/301285/daily-weather-forecast/301285?day=5&unit=c&lang=en-us"
        }
    ]
});
  const [weeklyForecast, setWeeklyForecast] = useState([]);

  useEffect(() => {
    // axiosClient.get("forecasts/v1/daily/5day/301285?apikey=DeCxXs7gAj6Gyz349pw50Gpb8MeNCoPC&details=true&metric=true")
    //     .then((response) => {
    //       setWeatherForecast(response.data);
    //     });
  }, []);

  useEffect(() => {
    if (props.date && lastUpdate != props.date.getHours()) {
      // axiosClient.get("currentconditions/v1/301285?apikey=DeCxXs7gAj6Gyz349pw50Gpb8MeNCoPC")
      //   .then((response) => {
      //     setWeather(response.data[0]);
      //   }).finally(setLastUpdate(props.date.getHours()));
    }
  }, [props.date]);

  useEffect(() => {
    setWeeklyForecast(getForecastRange(1, 4));
    if (props.date && props.date.getHours() % 4 == 0) {
      if (!gotForecast) {
      	// axiosClient.get("forecasts/v1/daily/5day/301285?apikey=DeCxXs7gAj6Gyz349pw50Gpb8MeNCoPC&details=true&metric=true")
        //   .then((response) => {
        //     setWeatherForecast(response.data);
        //     setWeeklyForecast(getForecastRange(1, 4));
	          
        //   }).finally(setGotForecast(true));
        
      }
      
    } else {
      setGotForecast(false);
    }
  }, [props.date]);

  const getTodayHigh = () => {
    let today = getForecast(0);
    return today ? `${Math.round(today.Temperature.Maximum.Value)}` : "00";
  }

  const getTodayLow = () => {
    let today = getForecast(0);
    return today ? `${Math.round(today.Temperature.Minimum.Value)}` : "00";
  }

  const getSunrise = (offset) => {
    let today = getForecast(offset);
    return today ? today.Sun.Rise.split('T')[1].substring(0,5) : '00:00';
  }

  const getSunset = (offset) => {
    let today = getForecast(offset);
    return today ? today.Sun.Set.split('T')[1].substring(0,5) : '22:00';
  }

  const getTodayMoonPhase = () => {
    let today = getForecast(0);
    return today ? `${today.Moon.Phase}` : "cheesy";
  }

  const isDay = () => {
    const today = new Date();
    if (!today) return false;
    return today.getHours() <= Number(getSunset(0).split(':')[0]) 
      && today.getHours() > Number(getSunrise(0).split(':')[0]);
  }

  const getSunInfo = () => {
    const today = new Date();
    if (!today) return '00:00';
    if (isDay()) return getSunset(0);
    else return getSunrise(1);
  }

  const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const getForecast = (offset) => {
    const today = new Date();
    if (!weatherForecast || !weatherForecast.DailyForecasts) return null;
    const forecast = weatherForecast.DailyForecasts.filter((t) => {
      return today ? addDays(today, offset).getDate() == new Date(t.Date).getDate() : false;
    });

    // if (offset == 1) {
    //   console.log('tomorrow:')
    //   console.log(forecast);
    // }

    if (!forecast || forecast.length <= 0) return '';
    return forecast[0];
  }

  const getForecastRange = (start, end) => {
    const today = new Date();
    if (!weatherForecast || !weatherForecast.DailyForecasts) return [];
    const forecast = weatherForecast.DailyForecasts.filter((t) => {
      let date = new Date(t.Date).getDate();
      return date >= addDays(today, start).getDate() && date <= addDays(today, end).getDate();
    });

    if (!forecast) return '';
    return forecast;
  }

  const getCurrentWeather = () => {
    return weather ? `${Math.round(weather.Temperature.Metric.Value)}` : "00";
  }

  const getWeatherIconNumber = () => {
    weather ? console.log(weather.WeatherIcon) : console.log();
    return weather ? weather.WeatherIcon : -1;
  }

  const getWeatherDescription = () => {
    return weather ? weather.WeatherText : "The conditions are clear";
  }

  return (
    <Card className={styles['card-bottom']}>
      <Box className={styles['weather-temperature-summary']}>
        {/* <Typography variant="h1" sx={{fontWeight: 'bolder', fontSize: '9rem', marginTop: '-1.5rem'}}>
          {getCurrentWeather()}
        </Typography> */}
        <Temperature size='large'>
          {getCurrentWeather()}
        </Temperature>
        <Box sx={{display: 'flex', flexDirection: 'row', marginTop: '-2rem'}}>
          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesomeIcon style={{marginRight: '0.5rem', color: '#EA0D01'}} icon={solid('chevron-up')} size="lg"/>
            <Temperature size='medium'>{getTodayHigh()}</Temperature>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '1.5rem'}}>
            <FontAwesomeIcon style={{marginRight: '0.5rem', color: '#2F66A9'}} icon={solid('chevron-down')} size="lg"/>
            <Temperature size='medium'>{getTodayLow()}</Temperature>
          </Box>
        </Box>
        <Box 
          sx={{
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginLeft: '0.75rem', 
            marginTop: '1rem'
          }}
        >

          {!isDay() && 
            <Typography sx={{ color: '#000000', marginRight: '0.5rem' }}>
              <Moon phase={getTodayMoonPhase()}/>
            </Typography>
          }
          {isDay() ? 
            <Box className={styles['sunset-container']}>
              <FontAwesomeIcon icon={solid('moon')} size="lg"/>
              <Typography sx={{ color: '#000000', marginLeft: '0.5rem' }}>
                {getSunInfo()}
              </Typography>
            </Box>
            :
            <Box className={styles['sunrise-container']}>
              <FontAwesomeIcon icon={solid('sun')} size="lg"/>
              <Typography sx={{ color: '#000000', marginLeft: '0.5rem' }}>
                {getSunInfo()}
              </Typography>
            </Box>
          }
        </Box>
        <WeatherIcon sx={{color: '#f9f9f9', marginTop: '1rem'}} size={100} state={getWeatherIconNumber()}>
        </WeatherIcon>
      </Box>
      <ForecastContainer>
        {weeklyForecast.map(forecast =>
          <ForecastCard forecast={forecast}>
          </ForecastCard>
        )}
      </ForecastContainer>
    </Card>
  );
}

export default WeatherCard;