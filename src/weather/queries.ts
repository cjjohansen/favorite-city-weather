import TemperatureUnit from "./temperatureUnit";

type CityId = {
  id: number;
};

type GetFiveDayTemperaturesForCity = {
  unit: TemperatureUnit;
};

type GetCitySummaries = {
  unit: TemperatureUnit;
  temperature: number;
  cities: string;
};

export { CityId, GetFiveDayTemperaturesForCity, GetCitySummaries };
