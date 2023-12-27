import WeatherService from "../API/weatherService";

export default class StorageService {
  static imgURL = '';
  
  static checkStorageData(data: { name?: any; latitude?: any; longitude?: any; timezone: any; code: any; }) {
    this.formatTimezone(data.timezone);
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
  }


  static formatTimezone(data: string) {
    let splitResult = data.split('/');
    WeatherService.getTimezone(splitResult[0], splitResult[1]); 
  };


  static getCountryCode(data: string) { 
    this.imgURL = `https://hatscripts.github.io/circle-flags/flags/${data.toLowerCase()}.svg`;
  };
}