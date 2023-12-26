export default class StorageService {
    
  static checkStorageData(data) {
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
    });
    localStorage.setItem("WeatherCity", JSON.stringify(JSONdata));
  }
}
