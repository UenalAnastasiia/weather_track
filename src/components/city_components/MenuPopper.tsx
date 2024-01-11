import React, { useState } from "react";
import { Grow, Paper, Popper, MenuItem, MenuList } from "@mui/material";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useNavigate } from "react-router-dom";
import StorageService from "../../services/storageService";


const MenuPopper = ( { setOpenSettings, openSettings, setShowDeleteBtns, resetApp, anchorRef, sxStyle } ) => {
    const navigate = useNavigate();
    const [disableAddBtn, setDisableAddBtn] = useState(false);


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

          StorageService.storageLimitReached() ? setDisableAddBtn(true) : setDisableAddBtn(false);
    }, [openSettings, anchorRef]);


    return (
        <Popper open={openSettings} anchorEl={anchorRef.current} role={undefined} placement="bottom-start" transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom' }}>
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseMenu}>
                    <MenuList sx={sxStyle.menuList} autoFocusItem={openSettings} id="composition-menu" aria-labelledby="composition-button" onKeyDown={handleListKeyDown}>
                      <MenuItem disabled={disableAddBtn} onClick={() => navigate('/search')}>add city</MenuItem>
                      <MenuItem onClick={() => {setShowDeleteBtns((showDeleteBtns) => !showDeleteBtns); setOpenSettings(false)}}>
                        delete city
                      </MenuItem>
                      <MenuItem onClick={resetApp}>reset app</MenuItem>
                      <MenuItem onClick={() => navigate('/info')}>app info</MenuItem>
                      <MenuItem onClick={() => navigate('/imprint')}>imprint</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
        </Popper>
    );
};

export default MenuPopper;