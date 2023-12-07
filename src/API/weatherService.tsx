export default class WeatherService {
  static coordinatesURL = [];


  static getCoordinatesForUrl(latitude: number, longitude: number) {
    this.coordinatesURL = [`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}`]
  }


  static async fetchTodayWeather() {
    const data = await fetch(
      `${this.coordinatesURL}&minutely_15=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FBerlin&forecast_days=2`
    );

    const jsonData = await data.json();
    return jsonData;
  }
  

  static async fetchCurrentWeather() {
    const data = await fetch(
      `${this.coordinatesURL}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum&timezone=Europe%2FBerlin&forecast_days=1&forecast_minutely_15=4`
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
}