import WeatherService from "../API/weatherService";

export default class StorageService {
    
  static checkStorageData(data) {
    this.formatTimezone(data.timezone);
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

  static pushToLocalStorage(data) {
    let JSONdata = JSON.parse(localStorage.getItem("WeatherCity"));
    JSONdata.push({
      name: data.name,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone
    });
    localStorage.setItem("WeatherCity", JSON.stringify(JSONdata));
  }


  static formatTimezone(data: string) {
    let splitResult = data.split('/');
    WeatherService.getTimezone(splitResult[0], splitResult[1]); 
  };
}
