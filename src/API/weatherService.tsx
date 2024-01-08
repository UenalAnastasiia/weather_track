export default class WeatherService {
  static coordinatesURL = [];
  static archivURL = [];
  static timezoneURL = [];
  static cityCoordinates = [];
  static cityName: string;


  static getCoordinatesForUrl(latitude: number, longitude: number, name: string) {
    this.coordinatesURL = [`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}`];
    this.archivURL = [`https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}`];
    this.cityCoordinates = [{latitude: latitude, longitude: longitude}];
    this.cityName = name;
  }

  static getTimezone(country: string, city: string) {
    this.timezoneURL = [{country: country, city: city}];
  }


  static async fetchTodayWeather() {
    const data = await fetch(
      `${this.coordinatesURL}&minutely_15=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=${this.timezoneURL[0].country}%2F${this.timezoneURL[0].city}&forecast_days=2`
    );

    const jsonData = await data.json();
    return jsonData;
  }
  

  static async fetchCurrentWeather() {
    const data = await fetch(
      `${this.coordinatesURL}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum&timezone=${this.timezoneURL[0].country}%2F${this.timezoneURL[0].city}&forecast_days=1&forecast_minutely_15=4`
    );

    const jsonData = await data.json();
    return jsonData;
  }

  static async fetchWeeklyWeather() {
    const data = await fetch(
      `${this.coordinatesURL}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,wind_speed_10m_max&forecast_days=10`
    );

    const jsonData = await data.json();
    return jsonData;
  }


  static async fetchHistoryWeather(start, end, parameter) {
    if (this.cityCoordinates.length === 0) {
      return 'No coordinates';
    } else {
      const data = await fetch(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${this.cityCoordinates[0].latitude}&longitude=${this.cityCoordinates[0].longitude}&start_date=${start}&end_date=${end}&daily=${parameter}&timezone=${this.timezoneURL[0].country}%2F${this.timezoneURL[0].city}`
      );
  
      const jsonData = await data.json();
      return jsonData;
    }
  }


  static async fetchDayHistoryWeather(date) {
    if (this.cityCoordinates.length === 0) {
      return 'No coordinates';
    } else {
      const data = await fetch(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${this.cityCoordinates[0].latitude}&longitude=${this.cityCoordinates[0].longitude}&start_date=${date}&end_date=${date}&daily=temperature_2m_mean,rain_sum,precipitation_hours&timezone=${this.timezoneURL[0].country}%2F${this.timezoneURL[0].city}`
      );
  
      const jsonData = await data.json();
      return jsonData;
    }
  }
}