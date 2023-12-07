export default class WeatherService {
  static async fetchTodayWeather(latitude: number, longitude: number) {
    const data = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&minutely_15=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FBerlin&forecast_days=2`
    );

    const jsonData = await data.json();
    return jsonData;
  }

  static async fetchCurrentWeather(latitude: number, longitude: number) {
    const data = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum&timezone=Europe%2FBerlin&forecast_days=1&forecast_minutely_15=4`
    );

    const jsonData = await data.json();
    return jsonData;
  }

  static async fetchWeeklyWeather(latitude: number, longitude: number) {
    const data = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,wind_speed_10m_max&forecast_days=10`
    );

    const jsonData = await data.json();
    return jsonData;
  }
}
