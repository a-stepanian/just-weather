export interface HourlyForecast {
  time: string;
  temp_f: number;
  chance_of_rain: number;
  chance_of_snow: number;
  icon: string;
  text: string;
}

export interface SingleDayForecast {
  date: string;
  sunrise: string;
  sunset: string;
  avghumidity: number;
  avgtemp_f: number;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  daily_will_it_rain: number;
  daily_will_it_snow: number;
  maxtemp_f: number;
  maxwind_mph: number;
  mintemp_f: number;
  totalprecip_in: number;
  text: string;
  icon: string;
  hourlyTemp: HourlyForecast[];
}

export interface Location {
  lat: number;
  lon: number;
  name: string;
  state: string;
  stateCode: string;
}

export interface CurrentConditions {
  temp_f: number;
  wind_mph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_in: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_f: number;
  uv: number;
  text: string;
  icon: string;
}
