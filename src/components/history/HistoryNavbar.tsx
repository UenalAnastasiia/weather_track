import { SetStateAction, useEffect, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import LightTooltip from "../../UI/LightTooltip";
import { CalendarMonth } from "@mui/icons-material";

const HistoryNavbar = ( { setDateLength, setShowDatepicker, setLabelLengthName, getLabelName } ) => {
    const [selectedIndex, setSelectedIndex] = useState(1);


    const dateNavBtns = [{name: '7 Days', length: '7'}, {name: '14 Days', length: '14'}, {name: '30 Days', length: '30'}, {name: '6 Months', length: '180'}, 
    {name: 'Year', length: '365'}, {name: '3 Years', length: '1095'}];

    const sxStyle = {
        icon: { color: 'white', fontSize: 24 },
        infoIcon: { color: 'white', fontSize: 18, position: 'absolute', top: '24px', right: '-24px' },
        buttonGroup: { boxShadow: 'none !important', alignItems: 'center' },
        button: { marginBottom: '10px', borderRadius: '8px !important', width: '110px !important', fontFamily: 'Baloo !important', fontSize: '16px' }
    }


    useEffect(() => {
        getLabelName() === '14 Days' ? setSelectedIndex(1) : setSelectedIndex(7);
    }, []);  


    const shareData = (length: string, name: string, index: SetStateAction<number>) => {
        setDateLength(length); 
        setLabelLengthName(name);
        setSelectedIndex(index);
    }


    return (
        <div className="historyNavDiv">
            <ButtonGroup orientation="vertical" variant="contained" color="secondary" sx={ sxStyle.buttonGroup }>
                {Array.from(Array(6).keys()).map((index) => (
                    <Button key={"btn"+index} sx={ sxStyle.button } style={{ backgroundColor: index === selectedIndex ? '#00adb5' : '#9c27b0'}}
                        onClick={() => {shareData(dateNavBtns[index].length, dateNavBtns[index].name, index)}}>
                            {dateNavBtns[index].name}
                    </Button>
                ))} 
                
                <LightTooltip title="Choose date">
                    <Button sx={ sxStyle.button } variant="contained" color="secondary" style={{ backgroundColor: 7 === selectedIndex ? '#00adb5' : '#9c27b0'}}
                        onClick={() => {setShowDatepicker(true); setSelectedIndex(7)}}>
                            <CalendarMonth sx={sxStyle.icon} />
                    </Button>
                </LightTooltip>
            </ButtonGroup>
        </div>
    );
};

export default HistoryNavbar;