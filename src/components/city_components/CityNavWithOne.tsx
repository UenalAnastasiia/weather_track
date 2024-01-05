import React, { useRef, useState } from "react";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import {Add, Remove, Settings} from '@mui/icons-material';
import LightTooltip from "../../UI/LightTooltip";
import { useNavigate } from 'react-router-dom';
import MenuPopper from "./MenuPopper";


const CityNavWithOne = ( {openCityWeather, localItems, setSelectedIndex, selectedIndex, deleteCityFromStorage, resetApp } ) => {
    const [openSettings, setOpenSettings] = useState(false);
    const [showDeleteBtns, setShowDeleteBtns] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();

    const sxStyle = {
        buttonGroup: { boxShadow: 'none !important', alignItems: 'center' },
        button: { marginBottom: '6px', borderRadius: '8px !important', width: '140px !important', fontFamily: 'Baloo !important', fontSize: '14px' },
        settingsIcon: { width: 'fit-content', position: 'absolute', top: 0, left: '-5vw', transform: 'scale(1.5)' },
        menuList: { backgroundColor: 'rgb(235 10 195 / 9%)', color: '#9c27b0', li: { fontWeight: '700 !important', fontFamily: 'Baloo !important' } }
    }


    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(openSettings);
    React.useEffect(() => {
      if (prevOpen.current === true && openSettings === false) {
        anchorRef.current!.focus();
      }
      prevOpen.current = openSettings;
    },   [openSettings]);


    return (
        <div>
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
                            </IconButton>)
                        }
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

            <MenuPopper setOpenSettings={setOpenSettings} openSettings={openSettings} setShowDeleteBtns={setShowDeleteBtns} 
                resetApp={resetApp} anchorRef={anchorRef} sxStyle={sxStyle} />
        </div>
    );
};

export default CityNavWithOne;