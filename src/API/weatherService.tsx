export default class WeatherService {
  static async fetchTodayWeather() {
    const data = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=51.1682&longitude=6.9309&minutely_15=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FBerlin&forecast_days=1"
    );

    const jsonData = await data.json();
    return jsonData;
  }


  static async fetchCurrentWeather() {
    const data = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=51.1682&longitude=6.9309&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m"
    );

    const jsonData = await data.json();
    return jsonData;
  }


  static async fetchWeeklyWeather() {
    const data = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=51.1682&longitude=6.9309&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=16"
    );

    const jsonData = await data.json();
    return jsonData;
  }

}