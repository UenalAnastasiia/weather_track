export default class WeatherService {
  static async fetchTodayWeather() {
    const data = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=51.167858&longitude=6.935225&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,pressure_msl,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FBerlin&forecast_days=1"
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
}
