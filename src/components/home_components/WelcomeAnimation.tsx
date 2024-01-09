import { useNavigate } from "react-router-dom";
import "../../styles/Welcome.css";
import { useEffect } from "react";

const WelcomeAnimation = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/track');
        }, 1000);
    }, []);


    return (
        <div className="welcomeAnimationBox">
            <h1 className="logoH1">WTrack</h1>
        </div>
    );
};

export default WelcomeAnimation;