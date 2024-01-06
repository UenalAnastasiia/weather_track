import { useNavigate } from "react-router-dom";
import "../../styles/Imprint.css";
import { IconButton } from "@mui/material";
import { Home } from "@mui/icons-material";

const Imprint = () => {
    const navigate = useNavigate();

    const sxStyle = {
        homeIcon: { position: 'absolute', top: '4vh', left: '4vw', transform: 'scale(1.5)' }
    }

    return (
        <div className="imprintBox">
            <IconButton sx={sxStyle.homeIcon} color="secondary" onClick={() => navigate('/track') }>
                <Home />
            </IconButton>

            <h1>Imprint</h1>
            <p>Anastasiia Ünal<br />
                Schützenstraße **<br />
                40*** *****</p>

            <p>Telefon: +49 175 7736*****<br />
                E-Mail: contact@anastasiia-uenal.de</p>
            Use icons from <a href="https://icons8.de/icons" target="_blank">icons8.de</a>
        </div>
    );
};

export default Imprint;