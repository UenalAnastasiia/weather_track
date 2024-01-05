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
  const [selectedIndex, setSelectedIndex] = useState(0);


  const sxStyle = {
    buttonGroup: { boxShadow: 'none !important', alignItems: 'center' },
    button: { marginBottom: '6px', borderRadius: '8px !important', width: '140px !important', fontFamily: 'Baloo !important', fontSize: '14px' },
    settingsIcon: { width: 'fit-content', position: 'absolute', top: 0, left: '-5vw', transform: 'scale(1.5)' },
    menuList: { backgroundColor: 'rgb(235 10 195 / 9%)', color: '#9c27b0', li: { fontWeight: '700 !important', fontFamily: 'Baloo !important' } }
  }


  useEffect(() => {
    openCityWeather(props.data); 
    setSelectedIndex(StorageService.getCityIndex(props.data.name));
  }, [props]);


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
    checkAfterDeleteCity(result, index);
  }


  const checkAfterDeleteCity = (result: Object[], deletedIndex: number) => {
    if ( result.length === 0) { 
      renderAfterDeleteLastCity();
    } else {
      renderAfterDelete(result, deletedIndex);
    }
  }


  const renderAfterDeleteLastCity = () => {
    setShowSpinner(true);
    setReloadData(true);

    setTimeout(() => {
      setShowSpinner(false);
      localStorage.removeItem("WeatherCity");
      navigate('/');
    }, 2000);
  }


  const renderAfterDelete = (result: Object[], deletedIndex: number) => {
    if (result.length === 1 && deletedIndex !== 0) {
      openCityWeather(result[0]);
      setSelectedIndex(0);
    } else if (result.length > 1 && deletedIndex !== 0) {
      openCityWeather(result[(deletedIndex - 1)]);
      setSelectedIndex((deletedIndex - 1));
    } else if (deletedIndex === 0) {
      openCityWeather(result[0]);
      setSelectedIndex(0);
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
            <div className="cityNavDiv" key={"div"+0}>
                <ButtonGroup key={"group"+0} orientation="vertical" variant="contained" color="secondary"
                  sx={ sxStyle.buttonGroup }>
                    <div>
                      <Button onClick={() => {openCityWeather(localItems[0]); setSelectedIndex(0)}} 
                      sx={ sxStyle.button } style={{ backgroundColor: 0 === selectedIndex ? '#00adb5' : '#9c27b0'}} >
                          {localItems[0].name}
                      </Button>

                      {showDeleteBtns && (
                        <IconButton sx={{position: 'absolute'}} color="secondary" onClick={() => deleteCityFromStorage(0) } className="removeAnimation">
                            <Remove />
                        </IconButton>)}
                    </div>

                    <div className="addIconDiv" key={"add"+0}>
                      <LightTooltip title="add city">
                        <IconButton sx={{ width: 'fit-content' }} color="secondary" onClick={() => navigate('/search') }>
                          <Add />
                        </IconButton>
                      </LightTooltip>
                    </div>

                      <IconButton key={"sett"+0} sx={sxStyle.settingsIcon} color="secondary" ref={anchorRef} id="composition-button"
                          aria-controls={openSettings ? 'composition-menu' : undefined} aria-expanded={openSettings ? 'true' : undefined}
                          aria-haspopup="true" onClick={() => { setOpenSettings((prevOpen) => !prevOpen) }}>
                        <Settings />
                      </IconButton>
                </ButtonGroup>
            </div>
          ) 
          : (
            <div className="cityNavDiv" key={"divNav"}>
                <ButtonGroup key={"group"+1} orientation="vertical" variant="contained" color="secondary"
                  sx={ sxStyle.buttonGroup }>
                  {localLength.map((index, el) => (
                    <div key={"div1"+index}>
                      <div key={"div2"+index}>
                        <Button key={"btn"+el} onClick={() => {{openCityWeather(localItems[index]); setSelectedIndex(index)}}} 
                        sx={ sxStyle.button }
                          style={{ backgroundColor: index === selectedIndex ? '#00adb5' : '#9c27b0'}}>
                          {localItems[index].name}
                        </Button>

                        {showDeleteBtns && (
                          <IconButton sx={{position: 'absolute'}} key={"remove"+el} color="secondary" 
                            onClick={() => deleteCityFromStorage(index) } className="removeAnimation">
                              <Remove />
                          </IconButton>)}
                      </div>
                    </div>
                  ))}

                      <div className="addIconDiv" key={"add"+1}>
                        <LightTooltip title="add city">
                          <IconButton sx={{ width: 'fit-content' }} color="secondary" onClick={() => navigate('/search') }>
                            <Add />
                          </IconButton>
                        </LightTooltip>
                      </div>

                      <IconButton key={"sett"+1} sx={sxStyle.settingsIcon} color="secondary" ref={anchorRef} id="composition-button"
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
                    <MenuList sx={sxStyle.menuList} autoFocusItem={openSettings} id="composition-menu" aria-labelledby="composition-button" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={() => navigate('/search')}>add city</MenuItem>
                      <MenuItem onClick={() => setShowDeleteBtns((showDeleteBtns) => !showDeleteBtns)}>delete city</MenuItem>
                      <MenuItem onClick={resetApp}>reset App</MenuItem>
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
