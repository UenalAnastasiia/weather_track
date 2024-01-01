const CityInfo = (props) => {
    
    return (
        <div className="cityInfoBox">
            <span><b>Country:</b> {props.cityData.country}</span>
            {props.cityData.admin1 && <span><b>State:</b> {props.cityData.admin1}</span>}
            {props.cityData.admin2 && <span><b>District:</b> {props.cityData.admin2}</span>}
            {props.cityData.timezone && <span><b>Timezone:</b> {props.cityData.timezone}</span>}
            {props.cityData.population && <span><b>Population:</b> {props.cityData.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>}
        </div>
    );
};

export default CityInfo;