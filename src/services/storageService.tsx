import WeatherService from "../API/weatherService";

export default class StorageService {
  static imgURL = '';
  static cityIndex = '';
  
  static checkStorageData(data: { name?: any; latitude?: any; longitude?: any; timezone: any; code: any; }) {
    const storedData = localStorage.getItem("WeatherCity");
    let JSONData = JSON.parse(storedData);

    if (storedData === null || JSONData.length === 0) {
      localStorage.setItem("WeatherCity", JSON.stringify([]));
    }

    this.getCountryCode(data.code);
    this.proveCityName(data);
  }
  

  static proveCityName(data) {
    let storedCities = JSON.parse(localStorage.getItem("WeatherCity"));
    let found = true;

    if (storedCities.length > 0) {
      for (let i = 0; i < storedCities.length; i++) {
        if (storedCities[i].name === data.name) {
          found = true;
          this.cityIndex = `${i}`;
          break;
        } else found = false;
      }
    } else found = false;

    found === true ? console.log() : this.pushToLocalStorage(data);
  }


  static pushToLocalStorage(data: { name: any; latitude: any; longitude: any; timezone: any; code: any; }) {
    let JSONdata = JSON.parse(localStorage.getItem("WeatherCity"));
    JSONdata.push({
      name: data.name,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      code: data.code
    });
    localStorage.setItem("WeatherCity", JSON.stringify(JSONdata));

    let updateLocal = JSON.parse(localStorage.getItem("WeatherCity"));
    this.cityIndex = updateLocal.findIndex(obj => obj.name === data.name);
  }


  static getCountryCode(data: string) { 
    this.imgURL = `https://hatscripts.github.io/circle-flags/flags/${data.toLowerCase()}.svg`;
  };


  static getCityIndex(name: string) { 
    let JSONdata = JSON.parse(localStorage.getItem("WeatherCity"));
    return JSONdata.findIndex(obj => obj.name === name);
  };


  static returnIndex() { 
    return this.cityIndex;
  };
}