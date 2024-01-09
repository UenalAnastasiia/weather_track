import React, { useRef, useState } from "react";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import {Add, PlaylistRemove, Remove, Settings} from '@mui/icons-material';
import LightTooltip from "../../UI/LightTooltip";
import { useNavigate } from 'react-router-dom';
import MenuPopper from "./MenuPopper";


const CityNavWithMulti = ( {openCityWeather, localItems, setSelectedIndex, selectedIndex, deleteCityFromStorage, resetApp, localLength } ) => {
    const [openSettings, setOpenSettings] = useState(false);
    const [showDeleteBtns, setShowDeleteBtns] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();

    const sxStyle = {
        buttonGroup: { boxShadow: 'none !important', alignItems: 'center' },
        button: { marginBottom: '6px', borderRadius: '8px !important', width: '140px !important', fontFamily: 'Baloo !important', fontSize: '14px' },
        settingsIcon: { width: 'fit-content', position: 'absolute', top: '4vh', left: '4vw', transform: 'scale(1.5)' },
        menuList: { backgroundColor: 'rgb(235 10 195 / 9%)', color: '#9c27b0', li: { fontWeight: '700 !important', fontFamily: 'Baloo !important' } },
        removeDeleteIcon: { width: 'fit-content', position: 'absolute', top: '-12px', left: '4px' }
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
            <div className="multiNav">
                <div className="cityNavDivMulti" key={"divNav"}>
                    <ButtonGroup key={"group"+1} orientation="vertical" variant="contained" color="secondary"
                    sx={ sxStyle.buttonGroup }>

                        {showDeleteBtns && (
                            <LightTooltip title="hide delete buttons">
                                <IconButton sx={sxStyle.removeDeleteIcon} color="secondary" onClick={() => setShowDeleteBtns(false) }>
                                    <PlaylistRemove />
                                </IconButton>
                            </LightTooltip>
                        )}

                        {localLength.map((index, el) => (
                            <div key={"div1"+index}>
                                <div key={"div2"+index}>
                                    {showDeleteBtns && (
                                        <IconButton sx={{position: 'absolute', left: 0}} key={"remove"+el} color="secondary" 
                                            onClick={() => deleteCityFromStorage(index) } className="removeAnimation">
                                            <Remove />
                                        </IconButton>)}

                                    <Button key={"btn"+el} onClick={() => {{openCityWeather(localItems[index]); setSelectedIndex(index)}}} 
                                        sx={ sxStyle.button } style={{ backgroundColor: index === selectedIndex ? '#00adb5' : '#9c27b0'}}>
                                            {localItems[index].name}
                                    </Button>
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
                    </ButtonGroup>
                </div>
            </div>

            <IconButton key={"sett"+1} sx={sxStyle.settingsIcon} color="secondary" ref={anchorRef} id="composition-button"
                aria-controls={openSettings ? 'composition-menu' : undefined} aria-expanded={openSettings ? 'true' : undefined}
                aria-haspopup="true" onClick={() => { setOpenSettings((prevOpen) => !prevOpen) }}>
                    <Settings />
            </IconButton>

            <MenuPopper setOpenSettings={setOpenSettings} openSettings={openSettings} setShowDeleteBtns={setShowDeleteBtns} 
                resetApp={resetApp} anchorRef={anchorRef} sxStyle={sxStyle} />
        </div>
    );
};

export default CityNavWithMulti;