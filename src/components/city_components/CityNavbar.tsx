import "../../styles/CityNavbar.css";
import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CurrentWeather from "../currentWeather_components/CurrentWeather";
import WeatherService from "../../API/weatherService";
import CoordinatesService from "../../API/coordinatesService";
import StorageService from "../../services/storageService";
import { Button, ButtonGroup, CircularProgress, IconButton, Grow, Paper, Popper, MenuItem, MenuList } from "@mui/material";
import {Add, Remove, Settings} from '@mui/icons-material';
import LightTooltip from "../../UI/LightTooltip";
import ClickAwayListener from '@mui/material/ClickAwayListener';


const CityNavbar = (props: { data: any; }) => {
  const [localItems, setLocalItems] = useState(JSON.parse(localStorage.getItem("WeatherCity")));
  let localLength = Array.from(Array(localItems.length).keys());

  const [showNav, setShowNav] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [weatherData, setWeatherData] = useState(Object);
  const [cityData, setCityData] = useState(Object);
  const [choosenCityName, setchoosenCityName] = useState(Object);
  const [showSpinner, setShowSpinner] = useState(true);
  const [showDeleteBtns, setShowDeleteBtns] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();


  const sxStyle = {
    buttonGroup: { boxShadow: 'none !important', alignItems: 'center' },
    button: { marginBottom: '6px', borderRadius: '8px !important', minWidth: '140px !important' },
    settingsIcon: { width: 'fit-content', position: 'absolute', top: 0, left: '-5vw' }
  }


  useEffect(() => {
    openCityWeather(props.data); 
  }, []);


  const openCityWeather = async (city) => {
    setReloadData(true);
    setShowSpinner(true);

    WeatherService.getCoordinatesForUrl(city.latitude, city.longitude, city.name);
    setchoosenCityName(city.name);
    
    StorageService.checkStorageData(city);
    shareDataToNextComponent();

    let fetchCityData = await CoordinatesService.fetchCoordinateAPI(city.name);
    setCityData(fetchCityData.results[0]);    
  };


  const shareDataToNextComponent = async () => {
    const todayWeather = await WeatherService.fetchTodayWeather();
    setWeatherData(todayWeather);

    setTimeout(() => {
      setShowNav(true);
      setReloadData(false);
      setShowSpinner(false);
    }, 1000);
  }


  const deleteCityFromStorage = (index) => {
    let currentCities = JSON.parse(localStorage.getItem("WeatherCity"));
    currentCities.splice(index, 1); 
    localStorage.setItem("WeatherCity", JSON.stringify(currentCities));
    let result = JSON.parse(localStorage.getItem("WeatherCity"));
    setLocalItems(result);

    loadAfterDeleteCity(result);
  }


  const loadAfterDeleteCity = (result: Object[]) => {
    if ( result.length === 0) {
      navigate('/search');
    } else if (result.length === 1) {
      openCityWeather(localItems[0]);
    } else {
      openCityWeather(localItems[result.length - 1]);
    }
  }


  const handleCloseMenu = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpenSettings(false);
  };


  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenSettings(false);
    } else if (event.key === 'Escape') {
      setOpenSettings(false);
    }
  }


  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openSettings);
    React.useEffect(() => {
      if (prevOpen.current === true && openSettings === false) {
        anchorRef.current!.focus();
      }
  
      prevOpen.current = openSettings;
  }, [openSettings]);


  const resetApp = () => {
    setShowSpinner(true);
    setReloadData(true);

    setTimeout(() => {
      setShowSpinner(false);
      localStorage.removeItem("WeatherCity");
      navigate('/');
    }, 2000);
  };


  return (
    <div>
      {showNav && 
        <div>
          {localLength.length === 1 ? (
            <div className="cityNavDiv">
                <ButtonGroup orientation="vertical" variant="contained" color="secondary"
                  sx={ sxStyle.buttonGroup }>
                    <div>
                      <Button onClick={() => openCityWeather(localItems[0])} sx={ sxStyle.button } >
                        {localItems[0].name}
                      </Button>

                      {showDeleteBtns && (<IconButton sx={{position: 'absolute'}} color="secondary" onClick={() => deleteCityFromStorage(0) }>
                          <Remove />
                      </IconButton>)}
                    </div>

                    <div className="addIconDiv">
                      <LightTooltip title="add city">
                        <IconButton sx={{ width: 'fit-content' }} color="secondary" onClick={() => navigate('/search') }>
                          <Add />
                        </IconButton>
                      </LightTooltip>
                    </div>

                      <IconButton sx={sxStyle.settingsIcon} color="secondary" ref={anchorRef} id="composition-button"
                          aria-controls={openSettings ? 'composition-menu' : undefined} aria-expanded={openSettings ? 'true' : undefined}
                          aria-haspopup="true" onClick={() => { setOpenSettings((prevOpen) => !prevOpen) }}>
                        <Settings />
                      </IconButton>
                </ButtonGroup>
            </div>
          ) 
          : (
            <div className="cityNavDiv">
                <ButtonGroup key={1} orientation="vertical" variant="contained" color="secondary"
                  sx={ sxStyle.buttonGroup }>
                  {localLength.map((index) => (
                    <div>
                      <div>
                        <Button key={localItems[index].name} onClick={() => openCityWeather(localItems[index])} sx={ sxStyle.button }>
                          {localItems[index].name}
                        </Button>

                        {showDeleteBtns && (<IconButton sx={{position: 'absolute'}} key={index} color="secondary" onClick={() => deleteCityFromStorage(index) }>
                          <Remove />
                        </IconButton>)}
                      </div>
                    </div>
                  ))}

                      <div className="addIconDiv">
                        <LightTooltip title="add city">
                          <IconButton sx={{ width: 'fit-content' }} color="secondary" onClick={() => navigate('/search') }>
                            <Add />
                          </IconButton>
                        </LightTooltip>
                      </div>

                      <IconButton sx={sxStyle.settingsIcon} color="secondary" ref={anchorRef} id="composition-button"
                          aria-controls={openSettings ? 'composition-menu' : undefined} aria-expanded={openSettings ? 'true' : undefined}
                          aria-haspopup="true" onClick={() => { setOpenSettings((prevOpen) => !prevOpen) }}>
                        <Settings />
                      </IconButton>
                </ButtonGroup>
            </div>
          )}

          <Popper open={openSettings} anchorEl={anchorRef.current} role={undefined} placement="bottom-start" transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom' }}>
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseMenu}>
                    <MenuList autoFocusItem={openSettings} id="composition-menu" aria-labelledby="composition-button" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={() => navigate('/search')}>Add city</MenuItem>
                      <MenuItem onClick={() => setShowDeleteBtns((showDeleteBtns) => !showDeleteBtns)}>Delete city</MenuItem>
                      <MenuItem onClick={resetApp}>Reset App</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>

          {showSpinner && <CircularProgress />}

          {!reloadData && 
            <div className="currentNavDiv">
                <CurrentWeather key={choosenCityName} name={choosenCityName} weatherData={weatherData} cityData={cityData}/>
            </div>
          }
        </div>
      }
    </div>
  );
};

export default CityNavbar;
