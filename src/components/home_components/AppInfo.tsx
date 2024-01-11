import { Home } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AppInfo = () => {
    const navigate = useNavigate();

    const sxStyle = {
        homeIcon: { position: 'absolute', top: '4vh', left: '4vw', transform: 'scale(1.5)' }
    }


    return (
        <div className="imprintBox">
            <IconButton sx={sxStyle.homeIcon} color="secondary" onClick={() => navigate('/track') }>
                <Home />
            </IconButton>

            <h1>App Info</h1>
            
        </div>
    );
};

export default AppInfo;