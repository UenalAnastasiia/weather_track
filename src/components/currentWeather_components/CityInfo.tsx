const CityInfo = (props) => {
    
    return (
        <div className="cityInfoBox">
            <span><b>Country:</b> {props.cityData.country}</span>
            <span><b>State:</b> {props.cityData.admin1}</span>
            {props.cityData.admin2 && <span><b>District:</b> {props.cityData.admin2}</span>}
            <span><b>Timezone:</b> {props.cityData.timezone}</span>
            <span><b>Population:</b> {props.cityData.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
        </div>
    );
};

export default CityInfo;